/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Super Kubenetes Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Super Kubenetes Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const formData = {
  apiVersion: 'v1',
  kind: 'Namespace',
  metadata: {
    name: `tester-random-2vbkq3`,
    annotations: {
      'kubesphere.io/description': 'tester random',
    },
  },
}

describe('The Projects Page', function() {
  before(function() {
    cy.login('admin')

    cy.request({
      method: 'GET',
      url: `/api/v1/namespaces/${formData.metadata.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (!resp.body.exist) {
        cy.request({
          method: 'POST',
          url: `/api/v1/namespaces`,
          body: formData,
        })
      } else {
        cy.request({
          method: 'PUT',
          url: `/api/v1/namespaces/${formData.metadata.name}`,
          body: formData,
        })
      }
    })
  })

  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    cy.server()

    cy.route('GET', /\/namespaces/).as('getNamespaces')

    cy.visit('/projects')

    cy.wait('@getNamespaces')

    cy.get('.ks-table tbody.table-tbody > tr')
      .its('length')
      .should('be.gt', 2)
  })

  it('list page base operation', function() {
    cy.server()

    cy.route('GET', /\/namespaces/).as('getNamespaces')
    cy.route('PATCH', /\/namespaces/).as('patchNamespace')
    cy.route('DELETE', /\/namespaces/).as('deleteNamespace')
    cy.route('GET', /\/workspaces/).as('getWorkspaces')
    cy.route('GET', /\/members/).as('getMembers')

    cy.visit('/projects')

    cy.wait('@getNamespaces')

    // search
    {
      cy.get('[data-test="search"] > input').type(`kubesphere-system{enter}`)

      // wait loading end
      cy.wait('@getNamespaces')

      cy.get(`[data-row-key="kubesphere-system"]`).contains('kubesphere-system')
    }

    // clear search
    {
      cy.get('.icon-clickable > .kubed-icon').click()

      cy.wait('@getNamespaces')

      cy.get('.ks-table tbody.table-tbody > tr')
        .its('length')
        .should('be.gt', 0)
    }

    // workspace filter
    {
      cy.get('.ks-table .table-column-has-filters .is-trigger')
        .contains('Workspace')
        .click()
      cy.contains('Not Assigned').click()

      cy.wait('@getNamespaces')

      cy.get('.ks-table tbody.table-tbody > tr')
        .its('length')
        .should('be.gt', 0)

      cy.get(`[data-row-key="${formData.metadata.name}"]`)
        .find('a')
        .should('not.exist')
      cy.get(`[data-row-key="${formData.metadata.name}"]`).contains(
        'Not Assigned'
      )
    }

    // assign workspace
    {
      cy.get(
        `[data-row-key="${formData.metadata.name}"] button .kubed-icon-more`
      ).click()
      cy.get(
        `[data-row-key="${
          formData.metadata.name
        }"] [data-test="table-item-modify"]`
      ).click()

      cy.wait('@getWorkspaces')

      cy.get('.form-item')
        .first()
        .find('.select-control')
        .click()
      cy.get('.form-item')
        .first()
        .contains('e2e-test')
        .click()

      cy.wait('@getMembers')

      cy.get('.form-item')
        .eq(1)
        .click()
      cy.get('.form-item')
        .eq(1)
        .contains('admin')
        .click()

      cy.get('[data-test="modal-ok"').click()

      cy.wait('@patchNamespace')

      cy.visit(`/projects?keyword=${formData.metadata.name}`)

      cy.get(`[data-row-key="${formData.metadata.name}"]`).contains('e2e-test')
      cy.get(
        `[data-row-key="${formData.metadata.name}"] a[href="/projects/${
          formData.metadata.name
        }"]`
      ).should('exist')
    }

    // delete
    {
      cy.visit(`/projects?keyword=${formData.metadata.name}`)
      cy.get(
        `[data-row-key="${formData.metadata.name}"] button .kubed-icon-more`
      ).click()
      cy.get(
        `[data-row-key="${formData.metadata.name}"] [data-test="table-item-delete"]`
      ).click()

      cy.get('input[name="confirm"]').type(formData.metadata.name)
      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@deleteNamespace')

      cy.get('.ks-table tbody.table-tbody > tr')
        .first()
        .contains(`Terminating`)
    }
  })
})
