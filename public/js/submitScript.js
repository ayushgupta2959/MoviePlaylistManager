const form = document.getElementById("change_list");
if (item.listType == 2 || item.listType == 3) {
  document
    .getElementById("move_to_watch")
    .addEventListener("click", function(e) {
      listType = 1;
      form.submit();
    });
}
if (item.listType == 1 || item.listType == 3) {
  document
    .getElementById("move_to_watching")
    .addEventListener("click", function(e) {
      listType = 2;
      form.submit();
    });
}
if (item.listType == 1 || item.listType == 2) {
  document
    .getElementById("move_to_watched")
    .addEventListener("click", function(e) {
      listType = 3;
      form.submit();
    });
}
