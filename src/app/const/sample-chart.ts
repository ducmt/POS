export const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sample 1',
    backgroundColor: 'rgba(255, 158, 179, 0.5)',
    borderColor: 'rgb(255, 158, 179)',
    borderWidth: 1,
    data: [
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1)
    ]
  }, {
    label: 'Sample 2',
    backgroundColor: 'rgba(130, 205, 255, 0.5)',
    borderColor: 'rgb(130, 205, 255)',
    borderWidth: 1,
    data: [
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1),
      Math.floor((Math.random() * 100) + 1)
    ]
  }]
};
