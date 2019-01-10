<template lang="pug">
  div
    h1 Error :v
    pre {{ error }}
</template>

<script>
export default {
 props: {
   error: {
     type: Object,
     default: () => {}
   }
 },
 layout: 'error'
}
</script>
