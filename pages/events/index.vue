<template lang="pug">
  section.container
    section.hero
      .hero-body
        .container
          h1.title
            | In process
          p Event
          pre {{ object }}
          br
</template>

<script>
export default {
  data() {
    return {
      object: {
        id: 'Number',
        calendarId: 'String',
        cludId: 'Number',
        title: 'String',
        body: 'String',
        category: 'String',
        location: 'String',
        start: 'String',
        end: 'String',
        color: 'String',
        bgColor: 'String',
      }
    }
  }
}
</script>
