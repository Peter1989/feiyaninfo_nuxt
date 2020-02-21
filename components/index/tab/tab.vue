<script>
export default {
    name: "tab",
    props: {
        index: {
            required: true,
            type: [Number, String]
        },
        label: {
            type: String,
            default: "tab"
        }
    },
    computed:{
        active () {
            return this.$parent.value === this.index
        }
    },
    methods:{
        handleClick(){
            this.$parent.onChange(this.index)
        }
    },
    render () {
        const tab = this.$slots.label || <span>{this.label}</span>
        const classNames = {
            tab: true,
            active: this.active
        }
        return (
            <li class={classNames} on-click={this.handleClick}>
                {tab}
            </li>
        )
    }
}
</script>
<style lang="stylus" scoped>
.tab
    flex 1
    display inline-block
    list-style none
    line-height 40px
    text-align center
    bottom -2px
    cursor pointer
    &.active
        border-bottom 2px solid blue
</style>