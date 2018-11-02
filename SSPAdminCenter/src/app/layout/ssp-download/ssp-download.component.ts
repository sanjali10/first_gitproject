import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-ssp-download',
  templateUrl: './ssp-download.component.html',
  styleUrls: ['./ssp-download.component.scss']
})
export class SspDownloadComponent implements OnInit {

  private DownloadUrl = null;
  private fileName = null;
  deviceInfo = null;
  private windowsSystem: boolean;
  private macSystem: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,
    private deviceService: DeviceDetectorService) { }

  private DOWNLOAD_APPLICATION_DATA: DownloadElement[] = [
    { name: 'Smart Meeting', Windows32: '', Windows64: '', Macintosh: '' },
    { name: 'Meeting Voice Client', Windows32: '', Windows64: '', Macintosh: '' },
    { name: 'Ssp Admin', Windows32: '', Windows64: '', Macintosh: '' }];

  displayedDownloadColumns: string[] = ['name', 'Windows32', 'Windows64', 'Macintosh'];
  downloadDataSource = this.DOWNLOAD_APPLICATION_DATA;
  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log(JSON.stringify(this.deviceInfo.userAgent));
    if (this.deviceInfo.os === 'windows') {
      this.windowsSystem = true;
    }
    if (this.deviceInfo.os === 'mac') {
      this.macSystem = true;
    }
  }

  downloadFile(applicationName, os) {
    console.log(JSON.stringify(applicationName));
    if (applicationName === 'Smart Meeting' && os !== 'mac') {
      this.DownloadUrl = environment.smartMeeting.url;
      this.fileName = applicationName + '.' + 'zip';
    } else if (applicationName === 'Meeting Voice Client' && os !== 'mac') {
      this.DownloadUrl = environment.meetingVoiceClient.url;
      this.fileName = applicationName + '.' + 'zip';
    } else if (applicationName === 'Ssp Admin' && os !== 'mac') {
      console.log('ssp download =====');
      return;
    } else if (applicationName === 'Smart Meeting' && os === 'mac') {
      this.DownloadUrl = environment.macSmartMeeting.url;
      this.fileName = applicationName + '.' + 'zip';
    } else if (applicationName === 'Meeting Voice Client' && os === 'mac') {
      this.DownloadUrl = environment.macMeetingVoiceClient.url;
      this.fileName = applicationName + '.' + 'zip';
    } else if (applicationName === 'Ssp Admin' && os === 'mac') {
      console.log('ssp download =====');
      return;
    } else {
      console.log('mac os =====');
    }

    return this.http
      .get(this.DownloadUrl, {
        responseType: 'blob'
      })
      .subscribe(res => {
        const objectUrl = window.URL.createObjectURL(res);
        const appendObject = document.createElement('a');
        document.body.appendChild(appendObject);
        appendObject.setAttribute('style', 'display: none');
        appendObject.href = objectUrl;
        appendObject.download = this.fileName;
        appendObject.click();
        window.URL.revokeObjectURL(objectUrl);
        appendObject.remove(); // remove the element
      }, error => {
        console.log('download error:', JSON.stringify(error));
      });
  }
}
export interface DownloadElement {
  name: string;
  Windows32: string;
  Windows64: string;
  Macintosh: string;
}

