<template lang="pug">
  section.section
    Calendar(
      style="height: 85vh"
      :calendars="calendarList"
      :schedules="scheduleList"
      :week="week"
      :month="month"
      :isReadOnly="true"
      :template="template"
      :useDetailPopup="useDetailPopup"
    )
</template>

<script>
import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar'

export default {
  layout: 'club',
  components: {
    Calendar
  },
  data() {
    return {
      object: {
        id: 'Number',
        calendarId: 'String',
        cludId: 'Number',
        title: 'String',
        body: 'String',
        category: 'String',
        location: 'String',
        start: 'String',
        end: 'String',
        color: 'String',
        bgColor: 'String',
      },
      calendarList: [
        {
          id: '0',
          name: 'home'
        },
        {
          id: '1',
          name: 'office'
        }
      ],
      scheduleList: [{
          id: '1',
          calendarId: '1',
          title: 'Charla :v',
          body: 'Occaecat elit non in qui elit tempor officia mollit id. Et id id exercitation voluptate anim sit Lorem elit. Nulla dolore dolore culpa amet enim sunt et amet reprehenderit eiusmod quis enim. Excepteur nisi ut ea enim esse eu minim anim anim. Eu dolor nisi amet sint dolor velit excepteur veniam laboris enim adipisicing. Enim do eu ullamco et et dolore magna sit amet sit Lorem duis laborum. Irure fugiat eiusmod culpa magna tempor.',
          category: 'time',
          dueDateClass: '',
          start: '2019-01-14T17:30:00+09:00',
          end: '2019-01-17T17:31:00+09:00'
        },
        {
          id: '2',
          calendarId: '1',
          title: 'Otra charla :v',
          category: 'time',
          dueDateClass: '',
          start: '2019-01-16T17:30:00+09:00',
          end: '2019-01-17T17:31:00+09:00'
        }
      ],
      view: 'week',
      taskView: true,
      scheduleView: ['time'],
      week: {
        narrowWeekend: true,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: false
      },
      month: {
        visibleWeeksCount: 6,
        startDayOfWeek: 1
      },
      timezones: [{
        timezoneOffset: 540,
        displayLabel: 'GMT+09:00',
        tooltip: 'Seoul'
      }, {
        timezoneOffset: -420,
        displayLabel: 'GMT-08:00',
        tooltip: 'Los Angeles'
      }],
      disableDblClick: true,
      isReadOnly: true,
      template: {
        milestone: function (schedule) {
          return `<span style="color:red;">${schedule.title}</span>`;
        },
        milestoneTitle: function () {
          return 'MILESTONE';
        },
      },
      useCreationPopup: true,
      useDetailPopup: true
    }
  }
}
</script>
