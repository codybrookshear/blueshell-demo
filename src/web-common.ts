export function content(onClickFun : any) {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerHTML = 'Click me!';
    btn.onclick = onClickFun;
    element.appendChild(btn);

    return element;
}