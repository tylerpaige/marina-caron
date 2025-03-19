import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: 'privacy',
  title: 'Privacy',
  type: 'document',
  // This setting restricts the actions to update and publish only, making it a singleton.
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'isPrivate',
      title: 'Password Protect Site',
      type: 'boolean',
      description:
        'Enable this to require a username and password for accessing the site.',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      description: 'Username for basic HTTP authentication.',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      description: 'Password for basic HTTP authentication.',
    },
  ],
})
