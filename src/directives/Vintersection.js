export default {
    mounted(el, binding) {
        console.log(el);
        console.log(binding);
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        }
        const callback = (entries, observer) => {
          if (entries[0].isIntersecting) {
            binding.value() //это функция loadMorePosts, которую передали в качестве значения в v-intersection
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    },
    name: 'intersection'
}