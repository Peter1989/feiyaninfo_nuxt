<script>
export default {
    name: 'tabs',
    props: {
        value: {
            type : [String, Number],
            required: true
        }
    },
    render () {
        return (
            <div class="tabs">
                <ul class="tabs-header">
                    {this.$slots.default}
                </ul>
            </div>
        )
    },
    methods: {
        onChange (value) {
            this.$emit('change', value)
        }
    }
}
</script>
<style lang="stylus" scoped>
.tabs
  justify-content space-around
  .tabs-header
    width 100vw
    display flex
    padding-left 0
</style>