<!-- <template>
  <div class="card cardSize">
    <div class="card-content">
      <img class=" responsive-img small" v-bind:src="answer.imageUrl" alt="">
    </div>
    <div class="card-action">
      <input
      :id="'radio-' + answer.text"
      :value='answer.text'
      class="radio-custom"
      v-model="picked"
      type="radio"
      >
      <label :for=" 'radio-'+ answer.text" class="radio-custom-label"><br>{{ answer.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-option',
  props: ['answer'],
  data () {
    return {
      selected: null
    }
  }
}
</script> -->
