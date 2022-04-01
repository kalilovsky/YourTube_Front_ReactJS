export default function DecodeEntity(text){
    let textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value
}