$(function () {
  var $modal = $('.modal-container');

  $(document).on('click', '#sign-in', function () {
    $modal.show();
    $modal.find('input#user-username').focus();
  });

  $(document).on('click', $modal, function (e) {
    if ($(e.target).hasClass('modal-container')) {
      $modal.hide();
    }
  });
});
