"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[678],{9535:function(e,t,l){var n=l(5444),a=l(7294);t.Z=function(){var e,t=null===(e=(0,n.useStaticQuery)("3257411868").site.siteMetadata)||void 0===e?void 0:e.author;return a.createElement("div",{className:"bio"},(null==t?void 0:t.name)&&a.createElement("p",null,"프론트엔드 개발 공부중인 ",a.createElement("strong",null,t.name)," ",(null==t?void 0:t.summary)||null,"입니다."))}},7704:function(e,t,l){l.r(t);var n=l(7294),a=l(5444),r=l(9535),i=l(7198),o=l(3751);t.default=function(e){var t,l=e.data,c=e.location,s=(null===(t=l.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",m=l.allMarkdownRemark.nodes;return 0===m.length?n.createElement(i.Z,{location:c,title:s},n.createElement(o.Z,{title:"All posts"}),n.createElement(r.Z,null),n.createElement("p",null,"게시물이 없습니다.")):n.createElement(i.Z,{location:c,title:s},n.createElement(o.Z,{title:"All posts"}),n.createElement("ol",{style:{listStyle:"none"}},m.map((function(e){console.log(e.frontmatter.description),console.log(e.excerpt);var t=e.frontmatter.title||e.fields.slug,l=new Date(e.frontmatter.date).toLocaleDateString();return n.createElement("li",{key:e.fields.slug},n.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h2",{itemProp:"headline"},n.createElement(a.Link,{to:e.fields.slug,itemProp:"url"},t)),n.createElement("time",{dateTime:e.frontmatter.date},l)),n.createElement("section",null,n.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-d68013602826a26a2774.js.map