
import { Component, OnInit, ɵConsole } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";

import { Socket, SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
var moment = require('moment');
import 'rxjs/add/operator/map';




declare var $;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DoctorService,]
})
export class ChatComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  msgText: string = "";
  onlineUsers: any = [];
  doctorName: string = "";
  patientName: string = "";
  query: string = "";
  chatRoomId: string = "";
  patientId: string = "";
  chatMessages: any = [];
  doctorProfilePic: string = "";
  patientProfilePic: any = "";
  in: any = 0
  constructor(private socket: Socket, private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService) {
    var config: any = {};
    config.options = {};
    config.url = 'http://api.Ischedulenow.com/'
    this.socket = new Socket(config);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getOnlineUsers()
  }

  enterPressed(e) {
    if (e.key == "Enter") {
      this.sendMessage()
    }
  }




  getOnlineUsers() {
    this.doctorService.getOnlineUsers().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.onlineUsers = res.Data;
        this.startChat(this.onlineUsers[0])
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
  getClass(i) {
    if (i == this.in)
      return 'active'
  }
  setClass(i) {
    this.in = i
  }
  startChat(user) {
    console.log(user)

    this.patientName = user.patient_id.firstName + " " + user.patient_id.lastName

    this.patientProfilePic = user.patient_id.profilePicPath
    this.doctorName = localStorage.getItem("firstName") + " " + localStorage.getItem('lastName')
    this.doctorProfilePic = localStorage.getItem("profilePicPath");
    this.createSocket(user._id, user.patient_id._id)

  }

  createSocket(chatRoomId, userId) {

    this.patientId = userId;
    this.chatRoomId = chatRoomId
    var config: any = {};
    config.options = { "query": { "roomId": chatRoomId } };
    config.url = 'http://api.Ischedulenow.com/'

    this.socket = new Socket(config);

    var socketConnection = this.socket.connect();

    this.getMessage();
    this.getOldMessages()
  }

  getOldMessages() {
    this.doctorService.getOldChatMessages(this.chatRoomId).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.chatMessages = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  sendMessage() {
    if (this.msgText.trimLeft() == "") { return false }
    var message = { "roomId": this.chatRoomId, "patientId": this.patientId, "doctorId": localStorage.getItem('_id'), "userType": "D", "messageText": this.msgText }

    this.socket.emit("sendMessage", message);
    this.msgText = "";
    this.getOldMessages()

  }

  getTime(dateTime) {
    return moment(dateTime).fromNow()


  }



  getMessage() {
    // return this.socket.fromEvent("chat massage").map(dataa => console.log(dataa))
    let self = this;
    this.socket.on('messageReceived', function (msg) {
      msg.message = msg.messageText
      self.chatMessages.push(msg)
    });
  }

}
