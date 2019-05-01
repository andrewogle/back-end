const { getStudent, getStudentById, getAllStudents, registerStudent } = require('./studentDb.js');
const db = require('../dbconfig.js');

describe('the student db helpers', () => {
    beforeEach(() => {
        return db("students").truncate();
    });
    describe('insertStudents fn', () => {
        it('should insert a student into the database', async () => {
            await registerStudent({
                username: 'bobTheBuilder',
                firstName: 'bob',
                lastName: 'builder',
                age: 12,
                school_id: 1
            });

            const studentList = await db('students');

            expect(studentList.length).toBe(1);
            expect(studentList[0].username).toBe('bobTheBuilder');
            expect(studentList[0].id).toBe(1);
            expect(studentList[0].firstName).toBe('bob');
            expect(studentList[0].lastName).toBe('builder');
            expect(studentList[0].age).toBe(12);
            expect(studentList[0].school_id).toBe(1);


        });
    });

    describe('the getAllStudents fn', () => {

        beforeEach(() => {
            return db("students").truncate();
        });

        it('should return a list of all students', async () => {

            await registerStudent({
                username: 'bobTheBuilder',
                firstName: 'bob',
                lastName: 'builder',
                age: 12,
                school_id: 1
            });

            const studentList = await getAllStudents();

            expect(studentList.length).toBe(1);
            expect(studentList[0].username).toBe('bobTheBuilder');
            expect(studentList[0].id).toBe(1);
            expect(studentList[0].firstName).toBe('bob');
            expect(studentList[0].lastName).toBe('builder');
            expect(studentList[0].age).toBe(12);
            expect(studentList[0].school_id).toBe(1);

        })
    })

});