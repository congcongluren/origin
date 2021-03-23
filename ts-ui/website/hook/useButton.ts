import { ref } from "vue";

export const useButton = () => {
  const buttonloading = ref(true);
  const buttonClick = () => {
    console.log("handle-click");
  };

  setTimeout(() => {
    buttonloading.value = false;
  }, 1000);
  return {
    buttonClick,
    buttonloading,
  };
};