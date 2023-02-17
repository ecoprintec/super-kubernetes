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

module.exports = {
  // Banner
  CREDENTIAL_PL: 'Credentials',
  DEVOPS_CREDENTIALS_DESC: 'Credentials are objects that contain some sensitive data, such as username and password, SSH key and Token. They are used to provide authentication for pulling code, pushing/pulling images, executing SSH scripts, etc. when a pipeline is running.',
  // List
  CREDENTIAL_EMPTY_DESC: 'Please create a credential.',
  // List > Create
  CREATE_CREDENTIAL: 'Create Credential',
  CREDENTIAL_NAME_EXIST_DESC: 'The credential name already exists. Please enter another name.',
  CREDENTIAL_TYPE_USERNAME_PASSWORD: 'Username and password',
  CREDENTIAL_TYPE_SSH: 'SSH key',
  PRIVATE_KEY: 'Private Key',
  PASSPHRASE: 'Passphrase',
  CREDENTIAL_TYPE_SECRET_TEXT: 'Access token',
  CREDENTIAL_TYPE_KUBECONFIG: 'kubeconfig',
  PASSWORD_TOKEN: 'Password/Token',
  KUBECONFIG_CONTENT_DESC: 'The default content is the kubeconfig settings of the current user.',
  CONTENT: 'Content',
}
