
export const formatterIDR = (number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number).replace(/(\.|,)00$/g, '');



  
export const wordSlicer = (word) => {
  return word.split(' ').slice(0,2).join(' ')
}
