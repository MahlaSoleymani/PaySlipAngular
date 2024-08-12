import {Injectable} from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  success(text: string) {
    Swal.fire({
      icon: 'success',
      title: 'موفقیت',
      text,
      confirmButtonText: 'تایید'
    })
  }

  error(text: string = "مشکلی رخ داده است. لطفا بعدا دوباره امتحان کنید.") {
    Swal.fire({
      icon: 'error',
      title: 'خطا',
      text,
      confirmButtonText: 'تایید'
    })
  }

  async errorSync({
                     title = '',
                     text = "با حذف این داده، اطلاعات قابل بازیابی نیست",
                     confirmBtn = "تایید",
                     cancelButtonText = "انصراف"
                   }) {
    return Swal.fire({
      title: `حذف ${title}`,
      icon: 'error',
      text: text,
      showCancelButton: !!confirmBtn,
      showConfirmButton: !!cancelButtonText,
      cancelButtonText: cancelButtonText,
      confirmButtonText: confirmBtn,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger m-2',
        cancelButton: 'btn btn-secondary m-2'
      }
    })
  }
}
