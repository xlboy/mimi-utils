const now = +new Date();
let index = 0;

export default function getUid() {
  return `simple-upload-${now}-${++index}`;
}
