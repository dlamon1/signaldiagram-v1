<script>
  export let title;
  export let x;
  export let y;

  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;
</script>

<div
  style="
		bottom: {clientHeight - y}px;
		right: {clientWidth - x}px;"
>
  {title}
</div>

<style>
  div {
    border: 1px solid #ddd;
    box-shadow: 1px 1px 1px #ddd;
    background: white;
    border-radius: 4px;
    padding: 4px;
    position: absolute;
    z-index: 3;
  }
</style>
