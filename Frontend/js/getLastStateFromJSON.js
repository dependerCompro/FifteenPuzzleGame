export function getLastStateFromJSON() {
  return new Promise((resolve) => {
    // console.log("Fetching Last State");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/lastState");
    xhr.send();
    xhr.onload = () => {
      const lastStateData = JSON.parse(xhr.response);
      resolve(lastStateData);
    };
  });
}
