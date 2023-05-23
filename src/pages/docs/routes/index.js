import Introduction from '../containers/Introduction'

export default [
  { path: '/docs/:folder/:filename', component: Introduction, exact: true },
  {
    path: '/docs/:folder/:upperfolder/:filename',
    component: Introduction,
    exact: true,
  },
  {
    path: '/docs/:folder/:upperfolder/:lowerfolder/:filename',
    component: Introduction,
    exact: true,
  },
  {
    path: '/docs',
    redirect: {
      from: '/docs',
      to: '/docs/introduction/what-is-SuperKubenetes',
      exact: true,
    },
  },
]
