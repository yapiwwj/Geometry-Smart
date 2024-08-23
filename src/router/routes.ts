export const constantRoute = [
  {
    path: '/',
    component: () => import('../layout/myHome.vue'),
    name: 'animation'
  },
  {
    path: '/home',
    redirect: '/homePage',
    component: () => import('../views/home/myHome.vue'),
    children: [
      {
        path: '/homePage',
        component: () => import('../views/home/homePage.vue'),
        name: 'homePage'
      },
      {
        path: '/login',
        component: () => import('../views/login/myLogin.vue'),
        name: 'login'
      },
      {
        path: '/register',
        component: () => import('../views/login/myRegister.vue'),
        name: 'register'
      },
      {
        path: '/layout',
        component: () => import('../layout/myIndex.vue'),
        name: 'index'
      },
      {
        path: '/course',
        component: () => import('../views/course/myIndex.vue'),
        name: 'course',
        redirect: '/course/course1?id=0',
        children: [
          {
            path: '/course/course1',
            component: () => import('../views/course/course1.vue')
          },
          {
            path: '/course/course2',
            component: () => import('../views/course/course2.vue')
          },
          {
            path: '/course/course3',
            component: () => import('../views/course/course3.vue')
          },
          {
            path: '/course/course4',
            component: () => import('../views/course/course4.vue')
          },
          {
            path: '/course/course5',
            component: () => import('../views/course/course5.vue')
          },
          {
            path: '/course/course6',
            component: () => import('../views/course/course6.vue')
          },
          {
            path: '/course/online-class',
            component: () => import('../views/course/onlineClass.vue')
          }
        ]
      },
      {
        path: '/function',
        redirect: '/function/AI',
        component: () => import('../views/function/myIndex.vue'),
        name: 'function',
        children: [
          {
            path: '/function/AI',
            component: () => import('../views/function/aiTutor.vue'),
            name: 'AI'
          },
          {
            path: '/function/discuss',
            redirect: '/function/discuss/new-reply',
            component: () => import('../views/function/discuss.vue'),
            name: 'discuss',
            children: [
              {
                path: '/function/discuss/new-reply',
                component: () => import('../views/function/components/newReply.vue'),
                name: 'newReply'
              },
              {
                path: '/function/discuss/new-publish',
                component: () => import('../views/function/components/newPublish.vue'),
                name: 'newPublish'
              }
            ]
          },
          {
            path: '/function/geometry-space',
            component: () => import('../views/function/geometrySpace.vue'),
            name: 'geometrySpace'
          },
          {
            path: '/function/draw',
            component: () => import('../views/function/draw.vue'),
            name: 'draw'
          },
          {
            path: '/function/transform',
            component: () => import('../views/function/transform.vue'),
            name: 'transform'
          },
          {
            path: '/function/tasks',
            component: () => import('../views/function/tasks.vue'),
            name: 'tasks'
          }
        ]
      },
      {
        path: '/about',
        component: () => import('../views/about/myIndex.vue'),
        name: 'about'
      },
      {
        path: '/usercenter',
        component: () => import('../views/usercenter/myIndex.vue'),
        name: 'usercenter'
      },
      {
        path: '/usercenter/knowledge-card',
        component: () => import('../views/usercenter/knowCard.vue'),
        name: 'knowCard'
      }
    ]
  },
  {
    path: '/teacher',
    component: () => import('../views/teacher/home/index.vue'),
    redirect: '/teacher/watch',
    children: [
      {
        path: '/teacher/watch',
        component: () => import('../views/teacher/home/watch.vue'),
        name: 'watch'
      },
      {
        path: '/teacher/exam-center',
        component: () => import('../views/teacher/home/exam.vue'),
        name: 'examCenter'
      },
      {
        path: '/teacher/info',
        component: () => import('../views/teacher/home/components/echarts.vue'),
        name: 'info'
      },
      {
        path: '/teacher/online-class',
        component: () => import('../views/teacher/home/onlineClass.vue'),
        name: 'onlineClass'
      },
      {
        path: '/teacher/teach',
        component: () => import('../views/teacher/home/teach.vue'),
        name: 'teach'
      },
      {
        path: '/teacher/news',
        component: () => import('../views/teacher/home/news.vue'),
        name: 'news'
      },
      {
        path: '/teacher/publish',
        component: () => import('../views/teacher/home/publish.vue'),
        name: 'publish'
      },
      {
        path: '/teacher/feedback',
        component: () => import('../views/teacher/home/publish.vue'),
        name: 'feedback'
      },
      {
        path: '/teacher/attendance',
        component: () => import('../views/teacher/home/attendance.vue'),
        name: 'attendance'
      }
    ]
  },
  {
    path: '/exam',
    component: () => import('../views/exam/index.vue'),
    name: 'exam',
    meta: {
      title: '测试',
      hidden: true,
      icon: ''
    }
  },
  {
    path: '/test',
    component: () => import('../views/exam/test2.vue'),
    name: 'test'
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: 'Any'
    }
  }
]
