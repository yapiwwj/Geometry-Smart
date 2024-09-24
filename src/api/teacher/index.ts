import request from '@/utils/request'
import type {
  Student_List_Response,
  Bar_Data_Response,
  Radar_Data_Response,
  Line_Data_Response,
  Pdf_Response
} from '@/api/teacher/type.d.ts'

enum API {
  GET_STUDENTS_LIST_URL = '/courseware/teacher/student/list',
  GET_BAR_DATA_URL = '/courseware/teacher/get/histogram',
  GET_RADAR_DATA_URL = '/courseware/teacher/get/radar',
  GET_LINE_DATA_URL = '/courseware/teacher/get/line',
  GET_PDF_URL = '/courseware/teacher/pdf'
}

export const getStudentsList = () =>
  request.get<any, Student_List_Response>(API.GET_STUDENTS_LIST_URL)

export const getBarData = (id: string) =>
  request.get<string, Bar_Data_Response>(`${API.GET_BAR_DATA_URL}?userId=${id}`)

export const getRadarData = (id: string) =>
  request.get<string, Radar_Data_Response>(`${API.GET_RADAR_DATA_URL}?userId=${id}`)

export const getLineData = (id: string) =>
  request.get<string, Line_Data_Response>(`${API.GET_LINE_DATA_URL}?userId=${id}`)

export const getPDFResponse = (id: number) =>
  request.post<number, Pdf_Response>(`${API.GET_PDF_URL}?id=${id}`)
