import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../shared/models/IResponse';
import { IAssignment } from '../shared/models/IAssesmentCreate';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private router: Router) { }

  assignmnetUrl  = environment.assesmentApiUrl;
  assUrl = "https://localhost:7000/api/Assesment"

  postAssignment(assignment: IAssignment)
  {
    return this.http.post<IResponse<any>>(this.assignmnetUrl , assignment);
  }

  indexAssesmnet()
  {
    return this.http.get<IResponse<any>>(this.assignmnetUrl);
  }

  detailAssesment(id: number)
  {
    return this.http.get<IResponse<any>>(this.assignmnetUrl+ `?assesmentCode=${id}`);
  }

  getCreated()
  {
    return this.http.get<IResponse<any>>(this.assignmnetUrl + "created")
  }


  loadDetailed(id: string)
  {
    return this.http.get<IResponse<any>>(this.assUrl+ "?assesmentCode=" + id )
  }


}
