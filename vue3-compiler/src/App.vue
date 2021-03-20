<template>
  <div>
    <template v-if="flag">
      <p>hello world</p>
    </template>
    
    
    <template v-else>
      <div>{{xxx}}</div>
      <p>hello world</p>
    </template>
  </div>
</template>