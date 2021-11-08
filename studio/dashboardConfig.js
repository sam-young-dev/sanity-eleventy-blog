export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-eleventy-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6188859a689b2926817d469f',
                  title: 'Sanity Studio',
                  name: 'sanity-eleventy-blog-studio-imqkkhde',
                  apiId: '53289780-6685-4e5f-bb3c-ef32ac332830'
                },
                {
                  buildHookId: '6188859aef942715e9fa47b3',
                  title: 'Blog Website',
                  name: 'sanity-eleventy-blog-web-sa7hiym3',
                  apiId: '72af4015-a6c3-461d-b152-c2ba8333d895'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/sam-young-dev/sanity-eleventy-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-eleventy-blog-web-sa7hiym3.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
