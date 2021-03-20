declare function $(selsector: string): {
  css(cal: String) :void
}

declare namespace $ {
  namespace fn {
    function extend():void
  }


}

declare namespace $ {
  const a = 1;
}

export default $