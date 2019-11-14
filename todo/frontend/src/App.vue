<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --white-color: #fff;
  
  --orange-color: #d68d1f;
  --orange-light-color: #cf9743;
  --orange-dark-color: #9c620b;

  --gray-color: #adaaaa;
  --gray-soft-color: #e7e3e3;
  --gray-light-color: #d3d3d3;
  --gray-dark-color: #686767;
  
  
  --primary-color: var(--orange-color);
  --secondary-color: var(--orange-light-color);

  --btn-color: var(--primary-color);
  --btn-color-hover: var(--secondary-color);
  --btn-color-active: var(--orange-dark-color);
  --btn-font-color: var(--white-color);

  --table-border-color: var(--gray-soft-color);
  --table-th-color: var(--gray-dark-color);
  --table-tr-hover-color: var(--gray-light-color);
}
#app {
  width: 800px;
  margin: 0 auto;
}
</style>
