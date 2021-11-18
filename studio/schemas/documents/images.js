export default {
  name: 'images',
  type: 'document',
  title: 'Images',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'mainImage'}]
    }
  ]
}
