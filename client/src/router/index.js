import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const beforeEnter = (to, __, next) => {
    if (!store.getters.logged) next('/login')
    else if (to.meta.role === 'all') next()
    else if (to.meta.role !== store.getters.role) next('/' + store.getters.role)
    else next()
}

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/student', component: () => import('../views/student/Dashboard.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/exams', component: () => import('../views/student/Exam.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/exams/calendar', component: () => import('../views/student/ExamCalendar.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/resources', component: () => import('../views/student/Resources.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/schedule', component: () => import('../views/student/Table.vue'), beforeEnter, meta: { role: 'all' } },
        { path: '/homeworks', component: () => import('../views/student/Homeworks.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/attendences', component: () => import('../views/student/Attendence.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/rates/exam', component: () => import('../views/student/Raiting.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/rates', component: () => import('../views/student/Rates.vue'), beforeEnter, meta: { role: 'student' } },
        { path: '/rates/midterm', component: () => import('../views/student/RateMidterm.vue'), beforeEnter, meta: { role: 'student' } },

        { path: '/tests/:id', component: () => import('../views/Test.vue'), beforeEnter, meta: { role: 'all' } },
        { path: '/midterms/:id', component: () => import('../views/student/MidtermExam.vue'), beforeEnter, meta: { role: 'all' } },
        { path: '/profile', component: () => import('../views/Profile.vue'), beforeEnter, meta: { role: 'all' } },
        { path: '/login', component: () => import('../views/Login.vue') },
        { path: '/', component: () => import('../views/Login.vue') },

        { path: '/admin/', component: () => import('../views/admin/Dashboard.vue'), beforeEnter, meta: { role: 'admin' } },
        { path: '/admin/groups', component: () => import('../views/admin/Groups.vue'), beforeEnter, meta: { role: 'admin' } },
        { path: '/admin/subjects', component: () => import('../views/admin/Subjects.vue'), beforeEnter, meta: { role: 'admin' } },
        { path: '/admin/tests', component: () => import('../views/admin/Test.vue'), beforeEnter, meta: { role: 'admin' } },
        { path: '/admin/students', component: () => import('../views/admin/Students.vue'), beforeEnter, meta: { role: 'admin' } },
        { path: '/admin/teachers', component: () => import('../views/admin/Teachers.vue'), beforeEnter, meta: { role: 'admin' } },
        { path: '/admin/table', component: () => import('../views/admin/LessonTable.vue'), beforeEnter, meta: { role: 'admin' } },
        
        { path: '/teacher', component: () => import('../views/teacher/Dashboard.vue'), beforeEnter, meta: { role: 'teacher' } },
        { path: '/teacher/table', component: () => import('../views/teacher/Table.vue'), beforeEnter, meta: { role: 'teacher' } },
        { path: '/teacher/attendence', component: () => import('../views/teacher/Attendance.vue'), beforeEnter, meta: { role: 'teacher' } },
        { path: '/teacher/resource', component: () => import('../views/teacher/Resources.vue'), beforeEnter, meta: { role: 'teacher' } },
        { path: '/teacher/midterm', component: () => import('../views/teacher/Midterm.vue'), beforeEnter, meta: { role: 'teacher' } },
        { path: '/teacher/homework', component: () => import('../views/teacher/HomeWorks.vue'), beforeEnter, meta: { role: 'teacher' } },
        
        { path: '/inspector', component: () => import('../views/inspector/Dashboard.vue'), beforeEnter, meta: { role: 'inspector' } },
        { path: '/results', component: () => import('../views/inspector/Results.vue'), beforeEnter, meta: { role: 'inspector' } },
        
        { path: '/dean', component: () => import('../views/dean/Dashboard.vue'), beforeEnter, meta: { role: 'dean' } },
        { path: '/dean/table', component: () => import('../views/admin/LessonTable.vue'), beforeEnter, meta: { role: 'dean' } },
        { path: '/dean/access', component: () => import('../views/dean/AccessToExam.vue'), beforeEnter, meta: { role: 'dean' } },
        { path: '/dean/attendance', component: () => import('../views/dean/AttendanceList.vue'), beforeEnter, meta: { role: 'dean' } },
        { path: '/dean/explicables', component: () => import('../views/dean/AttendanceExp.vue'), beforeEnter, meta: { role: 'dean' } },
        { path: '/dean/students', component: () => import('../views/dean/StudentsStatus.vue'), beforeEnter, meta: { role: 'dean' } },
        { path: '/dean/exams', component: () => import('../views/admin/Exams.vue'), beforeEnter, meta: { role: 'dean' } },
        { path: '/dean/rates', component: () => import('../views/dean/GroupRates.vue'), beforeEnter, meta: { role: 'dean' } },
        
        { path: '/director', component: () => import('../views/director/Home.vue'), beforeEnter, meta: { role: 'director' } },
        { path: '/director/inspectors', component: () => import('../views/admin/Inspectors.vue'), beforeEnter, meta: { role: 'director' } },
        
        { path: '/accountant', component: () => import('../views/accountant/StudentList.vue'), beforeEnter, meta: { role: 'accountant' } },
        
        { path: '/secret', component: () => import('../views/secret/SecretAdmin.vue'), beforeEnter, meta: { role: 'secret' } },
        { path: '/secrettest/:id', component: () => import('../views/secret/SecretTest.vue'), beforeEnter, meta: { role: 'secret' } },
    ]
})