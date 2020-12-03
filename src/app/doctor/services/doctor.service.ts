// import { window } from "rxjs/operator/window";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { environment } from "./../../../environments/environment";

import { CookieService } from "../../landing/services/cookie.service";

@Injectable()
export class DoctorService {
    constructor(
        private router: Router,
        private http: Http,
        private cookieService: CookieService
    ) { }

    getDoctorProfile() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        return this.http
            .get(environment.baseURL + "api/doctor/" + id, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }



    getOnlineUsers() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();
        headers.append("Authorization", this.cookieService.getItem("Token"));

        headers.append("Content-Type", "application/json");
        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/chatRooms", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getOldChatMessages(chatroomId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();
        headers.append("Authorization", this.cookieService.getItem("Token"));

        headers.append("Content-Type", "application/json");
        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/chatRoom/" + chatroomId + "/chat", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getDoctorPublicProfile(id) {
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        return this.http
            .get(environment.baseURL + "api/doctor/" + id, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getPatientProfile(patientId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        return this.http
            .get(environment.baseURL + "api/patient/" + patientId, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getPatientInvoice(patientId, appId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));


        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/patientInvoice/" + patientId + "/appointment/" + appId, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getAllInsurances() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(environment.baseURL + "api/allInsurances?limit=100", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getAllPatients() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/listPatients", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    searchPatient() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(environment.baseURL + "api/doctor/searchPatient", {
                "page": 0,
                "pageSize": 100,
                "username": "a"
            }, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    deletePatient(patId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .delete(environment.baseURL + "api/doctor/" + id + "/patients/" + patId, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getAllSpecialities() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(environment.baseURL + "api/allSpecialities?limit=100", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
    cancelAppointment(appointId) {
        let headers = new Headers();
        let id = this.cookieService.getItem("_id");

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(environment.baseURL + `api/doctor/${id}/appointment/${appointId}/cancel`, {}, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    changeAppointment(appointId, doa, toa) {
        let headers = new Headers();
        let id = this.cookieService.getItem("_id");

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(environment.baseURL + `api/doctor/${id}/appointment/${appointId}/reschedule`, {
                "dateOfAppointment": doa,
                "timeOfAppointment": toa
            }, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
    getDoctorList() {
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(environment.baseURL + "api/doctor/listAll", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    updateDoctorProfile(data) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(environment.baseURL + "api/doctor/" + id, data, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getDoctorScheule(data) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(environment.baseURL + "api/doctor/" + id + "/getDoctorsAppointmentsListForCalender", data, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    addPatient(patient) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL + "api/doctor/" + id + "/newPatient",
            { patientData: patient },
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    addPatientPrescription(data) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL + "api/doctor/" + id + "/patientReceipt",
            data,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    updatePatientPrescription(data, pId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(
            environment.baseURL + "api/doctor/" + id + "/patientReceipt/" + pId,
            data,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
    updateInvoice(data, pId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(
            environment.baseURL + "api/doctor/" + id + "/invoice/" + pId,
            data,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
    getPatientPrescription(patientId, appid) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(
            environment.baseURL + "api/doctor/" + id + "/patientReceipts/" + patientId + "/appointment/" + appid,

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
    addDoctorSchedule(doctorSchedule) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL + "api/doctor/" + id + "/newPatient",
            doctorSchedule,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }



    addCoupen(coupen) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL + "api/doctor/" + id + "/coupon",
            coupen,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    addCoupenCategory(coupenCategory) {
        let id = this.cookieService.getItem("_id");
        coupenCategory.doctor_id = id;
        let headers = new Headers();


        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL + "api/couponCategory",
            coupenCategory,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    editCoupen(coupen) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(
            environment.baseURL + "api/doctor/" + id + "/coupon/" + coupen._id,
            coupen,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    editCoupenCategory(coupenCategory) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(
            environment.baseURL + "api/doctor/" + id + "/coupenCategory/" + coupenCategory._id,
            coupenCategory,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    deleteCoupen(coupenId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .delete(
            environment.baseURL + "api/doctor/" + id + "/coupon/" + coupenId,

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    deleteCoupenCategory(coupenCategoryId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .delete(
            environment.baseURL + "api/doctor/" + id + "/couponCategory/" + coupenCategoryId,

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getCoupens() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(
            environment.baseURL + "api/doctor/" + id + "/coupon",

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    searchCoupens(key) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(
            environment.baseURL + "api/searchCoupon?s=" + key,

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getPatientAppointments(patientId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(
            environment.baseURL + "api/doctor/" + id + "/appointmentsList",

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    getCoupenCategories() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(
            environment.baseURL + "api/couponCategories",

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    getCoupen(cId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .get(
            environment.baseURL + "api/doctor/" + id + "/coupon/" + cId,

            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    addInvoice(dataInvoice) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL + "api/doctor/" + id + "/invoice",
            dataInvoice,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    bookAppointmentWithDoctorForNewPatient(patientData) {
        let id = this.cookieService.getItem("_id");
        patientData.doctorId = id;
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL +
            "api/doctor/" +
            id +
            "/bookAppointmentWithDoctorForNewPatient",
            { patientData: patientData },
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    addUpdateSchedule(schedule) {
        let id = this.cookieService.getItem("_id");

        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL +
            "api/doctor/" +
            id +
            "/addUpdateSchedule",
            schedule,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    addNote(noteData) {
        let id = this.cookieService.getItem("_id");

        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL +
            "api/doctor/" +
            id +
            "/addNote",
            noteData,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    editNote(noteData) {
        let id = this.cookieService.getItem("_id");

        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .put(
            environment.baseURL +
            "api/doctor/" +
            id +
            "/note/" + noteData._id,
            noteData,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }



    getNotes() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/notes", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    dateWiseAvailableSlots(dateOfAppointment) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(environment.baseURL + "api/doctor/" + id + "/dateWiseAvailableSlots", { "forDate": dateOfAppointment }, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    deleteNote(noteId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .delete(environment.baseURL + "api/doctor/" + id + "/note/" + noteId, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    getAllAppointments() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/appointmentsList", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    getAllInvoices() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/invoices", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
    getAllAppointmentsList() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/allAppointmentsList", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getTodaysAppointments() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/getDoctorsAppointmentsListForToday", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    approveAppointment(appid) {

        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .put(environment.baseURL + "api/doctor/" + id + "/appointment/" + appid + "/approve", { AppointmentId: appid }, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));

    }

    changeAppointmentStatus(data) {

        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .put(environment.baseURL + "api/doctor/" + id + "/appointment/" + data.appId + "/setStatus", data, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));

    }


    disapproveAppointment(appid) {

        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .put(environment.baseURL + "api/doctor/" + id + "/appointment/" + appid + "/reject", { AppointmentId: appid }, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));

    }





    getSchedule() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/doctor/" + id + "/schedule", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }


    addDocument(docData) {
        let id = this.cookieService.getItem("_id");

        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));
        return this.http
            .post(
            environment.baseURL +
            "api/patient/" +
            id +
            "/addDocument",
            docData,
            {
                headers: headers
            }
            )
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
    getDocuments() {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/patient/" + id + "/documents", {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    getDocumentsForPatient(patientId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .get(environment.baseURL + "api/patient/" + patientId + "/documents/" + id, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }

    deleteDocument(docId) {
        let id = this.cookieService.getItem("_id");
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.cookieService.getItem("Token"));

        return this.http
            .delete(environment.baseURL + "api/patient/" + id + "/document/" + docId, {
                headers: headers
            })
            .pipe(map(res => res.json()))

            .pipe(catchError(e => {
                if (e.status === 401) {
                    this.router.navigate(['/login'])
                    console.log("UnAuth");
                }
                if (e.ok == false) {
                    return "1";
                }
                return [];
            }));
    }
}



