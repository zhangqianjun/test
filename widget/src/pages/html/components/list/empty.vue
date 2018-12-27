<template>
	<div>
    <div class="tx-c p-t-80">
      <p>
        <img src="/assets/images/empty.png" class="w-150" style="margin: 0 auto;">
      </p>
      <br/>
      <p class="gra">
        {{ tips }}
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      tips: {
        type: String,
        default: ''
      }
    }
  }
</script>