export function content(onClickFun : any) {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerHTML = 'Keep clicking me and check the dev console';
    btn.onclick = onClickFun;
    element.appendChild(btn);

    return element;
}