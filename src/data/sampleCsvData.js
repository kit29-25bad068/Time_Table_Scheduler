/**
 * Sample CSV Templates for ABC College Timetable Import/Export
 */

export const SAMPLE_FACULTY_CSV = `name,department,designation,email,phone,maxWeeklyHours,competencies
Dr. Arun Kumar,AI & DS,Professor & Head,arun.kumar@kit.edu,+91 98401 23456,18,"Machine Learning, Artificial Intelligence"
Dr. Priya Sharma,AI & DS,Associate Professor,priya.sharma@kit.edu,+91 98402 34567,18,"Database Management Systems, Python Programming"
Prof. Karthik Raj,AI & DS,Assistant Professor,karthik.raj@kit.edu,+91 98403 45678,20,"Data Structures, Algorithms"
Dr. Meena Krishnan,Mathematics,Associate Professor,meena.krishnan@kit.edu,+91 98404 56789,16,"Probability & Statistics, Linear Algebra"
Prof. Suresh Babu,CSE,Assistant Professor,suresh.babu@kit.edu,+91 98405 67890,18,"Computer Networks, Operating Systems"
Dr. Divya Raman,AI & DS,Associate Professor,divya.raman@kit.edu,+91 98406 78901,16,"Deep Learning, Artificial Intelligence"
Prof. Naveen Kumar,AI & DS,Assistant Professor,naveen.kumar@kit.edu,+91 98407 89012,18,"Python Programming, Data Science"
Dr. Anitha Raj,AI & DS,Assistant Professor,anitha.raj@kit.edu,+91 98408 90123,16,"Data Science, Statistics"`;

export const SAMPLE_ROOMS_CSV = `name,type,capacity,building,floor,isLab
Room 101,Classroom,60,Academic Block A,1st Floor,false
Room 102,Classroom,60,Academic Block A,1st Floor,false
Room 201,Classroom,80,Academic Block A,2nd Floor,false
Room 202,Classroom,50,Academic Block A,2nd Floor,false
Room 301,Classroom,40,Academic Block B,3rd Floor,false
Lab 1 (Computer Lab),Computer Lab,40,Innovation Center,Ground Floor,true
Lab 2 (Computer Lab),Computer Lab,40,Innovation Center,Ground Floor,true
Lab 3 (AI/ML Lab),AI/ML Lab,35,Innovation Center,1st Floor,true`;

export const SAMPLE_SUBJECTS_CSV = `code,name,department,type,weeklyHours,facultyName,requiresLab,labType,semester
23AI301,Data Structures,AI & DS,Theory,4,Prof. Karthik Raj,false,,III
23AI302,Database Management Systems,AI & DS,Theory,4,Dr. Priya Sharma,false,,III
23AI303,Machine Learning,AI & DS,Theory,4,Dr. Arun Kumar,false,,III
23AI304,Artificial Intelligence,AI & DS,Theory,3,Dr. Divya Raman,false,,III
23AI305,Python Programming,AI & DS,Theory,3,Prof. Naveen Kumar,false,,III
23MA301,Probability & Statistics,Mathematics,Theory,3,Dr. Meena Krishnan,false,,III
23CS301,Computer Networks,CSE,Theory,3,Prof. Suresh Babu,false,,III
23AI306,Data Science Lab,AI & DS,Practical,3,Dr. Anitha Raj,true,Computer Lab,III
23AI307,Python Programming Lab,AI & DS,Practical,3,Prof. Naveen Kumar,true,Computer Lab,III
23AI308,Machine Learning Lab,AI & DS,Practical,3,Dr. Arun Kumar,true,AI/ML Lab,III`;

export const SAMPLE_BATCHES_CSV = `name,year,semester,section,department,strength,preferredRoom
II AI & DS A,2,III,A,AI & DS,58,Room 201
II AI & DS B,2,III,B,AI & DS,54,Room 202
II AI & ML A,2,III,A,AI & ML,60,Room 101
II CSE A,2,III,A,CSE,64,Room 203
II CSBS,2,III,A,CSBS,52,Room 303
II VLSI,2,III,A,VLSI,45,Room 301
II BME,2,III,A,BME,48,Room 302
III AI & DS A,3,III,A,AI & DS,58,Room 201
III CSE A,3,V,A,CSE,65,Room 401`;
