import axios from '@/axios'

export const getSQlResult = async (sql) => {
  const { data } = await axios({
    url: '/apiuser/debug/sql.json',
    method: 'post',
    data: { sql }
  })
  const sqlData = data.data.resultList
  const fields = sqlData && sqlData.length > 0 ? Object.keys(sqlData[0]) : []
  return { sqlData, fields }
}
