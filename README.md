# Angular JS starter set up

## ES6 ready using babel
## Gulp

## Breakpoint guide

Extra small devices (portrait phones, less than 576px)
@include media-breakpoint-down(xs) {  

}

Small devices (landscape phones, 576px and up)
@include media-breakpoint-up(xs) {  

}

Small devices (landscape phones, 576px and 767px)
@include media-breakpoint-only(sm) {
  
}

Small devices (landscape phones, less than 768px)
@include media-breakpoint-down(sm) { 
  html {
    font-size: 10px;
  }
}


Medium devices (tablets, 768px and up)
@include media-breakpoint-up(md) { 
  html {
    font-size: 12px;
  }

  h1, .h1 { @include rem(font-size, 46px); }
  h2, .h2 { @include rem(font-size, 36px); }
  h3, .h3 { @include rem(font-size, 30px); } 
  h4, .h4 { @include rem(font-size, 24px); }
  h5, .h5 { @include rem(font-size, 18px); }

  .text-lg { @include rem(font-size, 30px); } 
  .text-md { @include rem(font-size, 24px); }
  .text-sm { @include rem(font-size, 12px); }

}

Medium devices (tablets, 768px - 991px)
@include media-breakpoint-only(md) { 

}

Medium devices (tablets, less than 992px)
@include media-breakpoint-down(md) {  

}


Medium devices (tablets, 768px and up)
@include media-breakpoint-up(lg) {  

}

Large devices (desktops, 992px and 1199px)
@include media-breakpoint-only(lg) {  

}

Large devices (desktops, less than 1200px)
@include media-breakpoint-down(lg) {

}


Extra large devices (large desktops, 1200px and up)
@include media-breakpoint-up(xl) { 

}
