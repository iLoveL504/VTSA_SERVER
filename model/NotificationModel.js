import { pool } from '../config/database.js'

class NotificationModel {
    static async getAllNotifications() {
        const [ results ] = await pool.query(`
                select n.notification_id, n.subject, n.body, e.username
                from notification n
                join notification_recipients nr
                on n.notification_id = nr.notification_id
                join employees e
                on nr.employee_id = e.employee_id
            `)
            console.log(results)
            return results
    }

    static async getNotificationsById(id) {
        const [ results ] = await pool.query(`
                select n.notification_id, n.subject, n.body, e.username
                from notification n
                join notification_recipients nr
                on n.notification_id = nr.notification_id
                join employees e
                on nr.employee_id = e.employee_id
                where e.employee_id = :id
            `, { id: id })
            return results
    }

    static async newNotification(notification){
        await pool.query(`
                insert notification (subject, body) values (:subject, :body)
            `, {subject: notification.subject, body: notification.body})

    }

    static async distributeNotification(){
        const [ id_results ] = await pool.query('select employee_id from employees where job = \'Project Engineer\'')
        const [ latest_notification ] = await pool.query('SELECT notification_id FROM notification ORDER BY notification_id DESC LIMIT 1')
        console.log(latest_notification)
        for(const result of id_results){
            await pool.query(`
                insert into notification_recipients (notification_id, employee_id) 
                values (:notification_id, :employee_id)
            `, {notification_id: latest_notification[0].notification_id, employee_id: result.employee_id})
        }

        
    }
}

export { NotificationModel }