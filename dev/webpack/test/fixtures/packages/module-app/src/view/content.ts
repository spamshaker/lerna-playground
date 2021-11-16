export default 'CONTENT';

export async function showMeSideBar() {
  const { SideBar } = await import(/* webpackChunkName: "view-side-bar" */ './side-bar');
  SideBar();
}
