// synchronous //
// console.log('Star');

// function fetcData() {
//   const data = 'Data fetched';
//   return data;
// }

// const result = fetcData();
// console.log(result);

// console.log('End');

// asynchromous //

// console.log('Star');

// function getData() {
//   const data = 'Data fetched';
//   console.log(data);
// }

// function fetcDataAsync() {
//   setTimeout(
//     () => getData(),
//     //     {
//     //     const data = 'Data fatched';
//     //     console.log(data);
//     //   }
//     2000
//   );
// }

// fetcDataAsync();

// console.log('End');

// ====== //

// function sayHello() {
//   console.log('Helo everyone');
// }

// function greeting(name, callback) {
//   console.log('Hi,', name);
//   callback();
// }

// greeting('adi', sayHello);

// callback problem

// setTimeout(() => {
//   console.log('this is callback');
// }, 1000);

// === //

// function proses1() {
//   console.log('proses pertama');
// }
// function proses2() {
//   console.log('proses kedua');
// }
// function proses3() {
//   console.log('proses ketiga');
// }

// setTimeout(() => {
//   proses1();
//   setTimeout(() => {
//     proses2();
//     setTimeout(() => {
//       proses3();
//     }, 3000);
//   }, 2000);
// }, 5000);

// === //

// function proses1() {
//   setTimeout(() => {
//     console.log('proses pertama');
//   }, 5000);
// }
// function proses2() {
//   setTimeout(() => {
//     console.log('proses kedua');
//   }, 2000);
// }
// function proses3() {
//   setTimeout(() => {
//     console.log('proses ketiga');
//   }, 3000);
// }

// async function multipleProses() {
//   await proses1();
//   await proses3();
//   await proses3();
// }

// multipleProses();

// PROMISE NODE JS //

// function proses1() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('proses pertama');
//       resolve();
//     }, 3000);
//   });
// }
// function proses2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('proses kedua');
//       resolve();
//       reject('Ada Yang Salah di peroses 2');
//     }, 2000);
//   });
// }
// function proses3() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('proses ketiga');
//       resolve();
//     }, 1000);
//   });
// }

// async //

// proses1()
//   .then(() => proses2())
//   .then(() => proses3())
//   .catch((error) => console.error('Error:', error));

// async try, catch //

// async function executeProcesses() {
//   try {
//     await proses1();
//     await proses2();
//     await proses3();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// executeProcesses();
