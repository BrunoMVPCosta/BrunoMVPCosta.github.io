// Compress via uglify:
// uglifyjs load-disqus.js -c -m > load-disqus.min.js
(function(w, d) {
  var disqus_config = function () {
    this.page.identifier = '{{ page.id }}';
    this.page.url = '{{ page.url | absolute_url }}';
  };

 (function() {  
        var d = document, s = d.createElement('script');
        
        s.src = 'https://{{ site.disqus_shortname }}.disqus.com/embed.js';
        
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();

}(window, document));

