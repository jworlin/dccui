export class Audit{
  constructor(public id: string, public registrationRequestId: string, public logicAppId: string, public data: string, public status: string, public type: string, public eventAt: string){}
}
