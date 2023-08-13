$(document).ready(function () {
  // function for running when the DOM is fully loaded and ready

  // current date and time
  var currentDate = dayjs().format('dddd, MMMM D');

  // display the current date in the header
  $('#currentDay').text(currentDate);

  // add a click event listener to the save buttons
  $('.saveBtn').on('click', function () {
    // traverse the DOM to get the time-block id of the containing element
    var timeBlockId = $(this).closest('.time-block').attr('id');

    // get user input description from the textarea within the same time-block
    var userDescription = $(this).siblings('.description').val();

    // save user input in local storage by using the time-block id as a key
    localStorage.setItem(timeBlockId, userDescription);
  });

  // load saved descriptions from local storage and populate textareas
  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var savedDescription = localStorage.getItem(timeBlockId);
    if (savedDescription !== null) {
      $(this).find('.description').val(savedDescription);
    }
  });

  // update time-block colors based on current time
  var currentHour = dayjs().hour();
  $('.time-block').each(function () {
    var hour = parseInt($(this).attr('id').split('-')[1]);
    if (hour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (hour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
});
