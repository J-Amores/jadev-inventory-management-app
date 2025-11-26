import { PrismaClient, UserRole, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Categories for the Plant/Nursery theme
const CATEGORIES = [
  'Flowers',
  'Succulents',
  'Shrubs',
  'Trees',
  'Herbs',
  'Climbers',
  'Ferns',
  'Ground Cover',
];

// Product Images (Looping 3 as requested)
const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=300&auto=format&fit=crop',
];

// Deterministic category assignment
const getCategory = (id: string) => {
  const code = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return CATEGORIES[code % CATEGORIES.length];
};

const getImage = (index: number) => {
  return PRODUCT_IMAGES[index % PRODUCT_IMAGES.length];
};

// Raw data from constants.ts
const RAW_PRODUCTS = [
  { productId: 'd35623ee-bef6-42b2-8776-2f99f8bb4782', name: 'Pinkscale Blazing Star', price: 456.04, rating: 2.25, stockQuantity: 124834 },
  { productId: '8ac1ac77-7358-425e-be16-0bdde9f02e59', name: 'Gila Milkvetch', price: 899.05, rating: 3.56, stockQuantity: 799402 },
  { productId: '1afc136b-4d9f-4e8e-aace-8e1df908a404', name: 'Rocky Mountain Zinnia', price: 264.37, rating: 3.23, stockQuantity: 842192 },
  { productId: 'af84cc12-4fea-4f58-aece-f2ce92ca9580', name: 'Guadalupe Suncup', price: 555.93, rating: 4.09, stockQuantity: 236333 },
  { productId: '86e3bb1c-2f5d-4774-98f3-4df7cddd0a0f', name: 'Saline Phlox', price: 82.62, rating: 4.8, stockQuantity: 601208 },
  { productId: '26b017c6-06d8-443f-9b4a-d6b1cee6f4c0', name: 'Common Brighteyes', price: 435.44, rating: 0.27, stockQuantity: 124068 },
  { productId: '440c9e80-6bf8-4eb3-b2d2-f81936d67de3', name: 'Vermejo Phlox', price: 759.15, rating: 2.46, stockQuantity: 234525 },
  { productId: '98255f4e-40a6-470f-89a5-0792729f8947', name: 'Purple Marshlocks', price: 974.99, rating: 4.82, stockQuantity: 739009 },
  { productId: '2a339fb2-f9f3-43bc-a85a-b217a0a38f12', name: 'Hamatocaulis Moss', price: 639.9, rating: 1.17, stockQuantity: 754285 },
  { productId: '8a8391b2-b4ac-4847-b652-66ffd8d65875', name: 'Wax Myrtle', price: 62.95, rating: 4.6, stockQuantity: 205240 },
  { productId: 'be2157fb-7454-405e-9511-bf7ba81b7726', name: 'Thladiantha', price: 699.0, rating: 1.65, stockQuantity: 399124 },
  { productId: 'fdf1ba3d-fa06-4ce5-90ff-d081c5d37176', name: 'Common Tarweed', price: 899.61, rating: 2.39, stockQuantity: 196884 },
  { productId: 'afded6df-058f-477d-9878-e0e0b1d3dff3', name: 'Smooth Phlox', price: 575.6, rating: 4.38, stockQuantity: 673658 },
  { productId: 'daa29167-82a7-474b-9687-b8b903e7ec69', name: "Lemmon's Beggarticks", price: 492.35, rating: 1.07, stockQuantity: 205143 },
  { productId: 'ccb83982-71f3-4497-bad8-7e64c6920dc6', name: 'Globe Fimbry', price: 304.69, rating: 2.62, stockQuantity: 388596 },
  { productId: '1936d406-e89e-40e4-bff7-1827532269d4', name: 'Columbia Milkvetch', price: 845.15, rating: 2.21, stockQuantity: 631658 },
  { productId: 'c849a535-5f8b-47e3-889c-015693a644ac', name: 'Girdlepod', price: 880.09, rating: 1.49, stockQuantity: 65457 },
  { productId: '0c3e80ee-59b3-4fc4-b760-8b07acc2d3ae', name: "Lindley's Clerodendrum", price: 51.66, rating: 1.53, stockQuantity: 263383 },
  { productId: 'd8f5bee3-f3eb-4071-a124-6b857e0fd798', name: 'Arizonia Dry Rock Moss', price: 746.88, rating: 4.71, stockQuantity: 616812 },
  { productId: '8d15de86-0e4a-4414-9166-7a33610202d3', name: 'Clamshell Orchid', price: 17.1, rating: 0.79, stockQuantity: 604774 },
  { productId: 'ea8fd0b9-c2d9-4d43-9c23-44cb99d079bb', name: "Fourleaf Mare's-tail", price: 905.04, rating: 3.71, stockQuantity: 909107 },
  { productId: '25d01c80-bca1-4a00-b1d0-0fbd39ff9e89', name: "Simpson's Rosinweed", price: 184.41, rating: 1.98, stockQuantity: 953695 },
  { productId: '1d6df6e3-b7ea-4507-9d66-87c6ee8ed5b9', name: 'Lobelia', price: 163.6, rating: 0.81, stockQuantity: 341530 },
  { productId: '000a8c23-5bca-436c-a216-4e747a94c511', name: 'Yew Plum Pine', price: 196.27, rating: 1.6, stockQuantity: 967173 },
  { productId: 'c5b600dc-6bfb-492a-b335-c3cc8c707959', name: 'Thimbleberry', price: 602.37, rating: 0.13, stockQuantity: 162208 },
  { productId: '9d5fafbc-312b-47e8-ada1-283918f0c3b5', name: 'Yellowturbans', price: 564.82, rating: 4.74, stockQuantity: 33021 },
  { productId: '0114d5d4-ae48-46fa-b0ca-afe60eb88add', name: 'Field Brome', price: 664.2, rating: 0.13, stockQuantity: 363992 },
  { productId: 'e5b0da8c-148d-4680-b262-8609fb8a10da', name: 'Pentas', price: 685.1, rating: 1.5, stockQuantity: 635092 },
  { productId: '2be5b024-2c96-4f29-912c-c6f36353f799', name: 'Strigose Beard Lichen', price: 373.81, rating: 1.06, stockQuantity: 35383 },
  { productId: 'fcf2e432-62a3-4b6f-a34d-36e42a12272e', name: 'Mad River Fleabane', price: 669.97, rating: 1.34, stockQuantity: 880242 },
  { productId: 'fc4c81e5-f1ac-40f5-8c6f-da3fbad5599d', name: 'Chickenthief', price: 100.11, rating: 0.49, stockQuantity: 896782 },
  { productId: '07238d8e-0037-4972-87ca-0df206ee3e42', name: 'Palmleaf Poppymallow', price: 22.99, rating: 3.42, stockQuantity: 635344 },
  { productId: '154b7860-23a2-4564-ad99-1745ab7122ef', name: 'Guayanan Waterclover', price: 45.45, rating: 0.34, stockQuantity: 456487 },
  { productId: '8d4bf814-65d4-4df4-84cc-68911d925fdf', name: "Emory's Acacia", price: 847.6, rating: 1.79, stockQuantity: 638956 },
  { productId: 'a52bf1bd-3d35-4cd2-849a-354e3952e2d2', name: 'American Century Plant', price: 969.47, rating: 3.66, stockQuantity: 248630 },
];

const RAW_SALES_SUMMARY = [
  { salesSummaryId: '9234a776-e6ac-46e2-bc24-c959ce216751', totalValue: 4754106.83, changePercentage: 61.51, date: '2023-03-18T22:32:25Z' },
  { salesSummaryId: 'e5648831-7d0e-4ef5-8e04-f6e6a0eaafb1', totalValue: 1512948.97, changePercentage: -2.28, date: '2023-09-03T13:50:20Z' },
  { salesSummaryId: '785d33be-a1d8-47a6-b1d3-779942196b5c', totalValue: 5545737.54, changePercentage: -55.29, date: '2023-07-28T13:16:27Z' },
  { salesSummaryId: '0541d262-46aa-4961-b7c0-ce09143ccf34', totalValue: 3260113.92, changePercentage: -71.7, date: '2023-05-16T08:32:38Z' },
  { salesSummaryId: '185bb7e9-a9c0-4691-87d3-ca597a29e4d8', totalValue: 849737.25, changePercentage: 9.16, date: '2023-08-26T05:41:40Z' },
  { salesSummaryId: '6a1cb0f7-a4e1-4157-800d-86a59fb5fc16', totalValue: 98903.57, changePercentage: 36.24, date: '2023-09-02T01:49:46Z' },
  { salesSummaryId: '7d6d3e60-4687-40e3-9a77-452ea298df02', totalValue: 973557.25, changePercentage: 34.22, date: '2023-03-31T15:20:53Z' },
  { salesSummaryId: '7e071f0f-cff2-4699-bc67-3bee1114cb9e', totalValue: 9761085.56, changePercentage: -57.32, date: '2023-06-25T12:21:04Z' },
  { salesSummaryId: '6688c13c-758a-44c9-a291-d630d13dfd33', totalValue: 9819343.72, changePercentage: -49.57, date: '2023-06-21T17:57:01Z' },
  { salesSummaryId: 'bce35149-3c37-4a0d-8963-c9f550b262f3', totalValue: 2757578.95, changePercentage: 73.95, date: '2023-05-13T15:02:46Z' },
  { salesSummaryId: '4d86c2df-d759-49df-9ecd-1eaf27a3d590', totalValue: 8894817.67, changePercentage: -25.81, date: '2023-03-31T16:04:25Z' },
  { salesSummaryId: 'c85efa84-d294-4c2e-a9a5-8774d92af8bf', totalValue: 2882180.14, changePercentage: 57.29, date: '2024-03-13T01:19:11Z' },
  { salesSummaryId: '9257a2eb-d1ba-4cde-a0c2-cdf766c8c79c', totalValue: 543716.99, changePercentage: 8.85, date: '2024-02-04T05:14:46Z' },
  { salesSummaryId: '2f94d909-0f3a-45fb-8072-5054b6dba2d6', totalValue: 1171786.52, changePercentage: 79.4, date: '2023-04-20T00:12:05Z' },
  { salesSummaryId: '9bc6eca5-9f18-4e72-bed0-7a98bb759af3', totalValue: 9574424.72, changePercentage: 10.42, date: '2023-04-04T22:57:17Z' },
  { salesSummaryId: 'a0979a0f-bbe2-4bd8-9639-e6c1d890c6e1', totalValue: 1717855.75, changePercentage: -76.77, date: '2023-07-24T23:01:04Z' },
  { salesSummaryId: 'd2ff270c-63d9-4510-9524-91cb95494a9d', totalValue: 1328587.6, changePercentage: 62.35, date: '2023-12-30T03:52:12Z' },
  { salesSummaryId: '56693648-d829-4d6a-8ff1-379ed00187c0', totalValue: 3363438.49, changePercentage: -3.73, date: '2023-06-16T12:55:40Z' },
  { salesSummaryId: '22c58913-c4ad-44ac-bcf0-6309b6c61f26', totalValue: 6253195.27, changePercentage: -33.39, date: '2023-05-12T13:22:28Z' },
  { salesSummaryId: 'e14f2cdc-28c8-4041-a5c3-444e32f4df96', totalValue: 759235.03, changePercentage: -70.16, date: '2023-05-04T03:54:06Z' },
  { salesSummaryId: 'abb07538-994f-40df-9850-b93d758566d6', totalValue: 8849902.08, changePercentage: 49.99, date: '2023-10-23T10:52:58Z' },
  { salesSummaryId: '3c1be92e-86a4-4ba9-9cc4-0cd25cdd9b53', totalValue: 6985354.53, changePercentage: -45.28, date: '2023-06-12T08:59:54Z' },
  { salesSummaryId: 'b6438519-cd43-49e4-a6ea-c1e97b6b9f4f', totalValue: 1977818.88, changePercentage: -1.73, date: '2023-07-30T18:47:25Z' },
  { salesSummaryId: '47d22ba7-a75b-4570-a0ee-5936af301dc0', totalValue: 3051711.61, changePercentage: 46.06, date: '2023-06-21T19:26:53Z' },
  { salesSummaryId: '75bf9bb7-67bf-4674-8d57-ef96c387bd5f', totalValue: 1776483.92, changePercentage: 5.92, date: '2024-01-04T23:05:09Z' },
  { salesSummaryId: 'aa076cf0-2af4-42d1-a65a-e21048900cdc', totalValue: 8008789.18, changePercentage: -92.62, date: '2023-07-11T05:46:12Z' },
  { salesSummaryId: '0eabb55c-311b-4794-8621-684b8e3c6af3', totalValue: 9939857.2, changePercentage: 43.61, date: '2023-11-03T17:55:50Z' },
  { salesSummaryId: '02421d34-eab8-4c74-be90-29ae960217e0', totalValue: 7378147.37, changePercentage: -8.68, date: '2023-06-02T21:55:25Z' },
  { salesSummaryId: 'dab41155-3b2c-4260-9b92-0fb36239e76a', totalValue: 5903962.21, changePercentage: 54.41, date: '2023-04-15T12:08:49Z' },
  { salesSummaryId: '777946fe-c45b-48c4-8009-dd34727a2d6e', totalValue: 3995392.55, changePercentage: -39.88, date: '2023-06-04T10:27:19Z' },
  { salesSummaryId: '0218422f-dff4-4b96-a485-ec81dfb52b1d', totalValue: 2236665.35, changePercentage: 62.25, date: '2023-04-26T18:00:10Z' },
  { salesSummaryId: '2cdc1dff-3f48-4223-b75d-6d40d5ebd70f', totalValue: 4924895.6, changePercentage: 91.7, date: '2023-10-03T09:22:11Z' },
  { salesSummaryId: '2876f4ae-7146-4144-a424-1050d3889af9', totalValue: 8020749.83, changePercentage: -53.71, date: '2023-09-09T18:08:04Z' },
  { salesSummaryId: '72d4764c-6438-43e8-9f5e-1e1392c49daa', totalValue: 1401814.98, changePercentage: -62.89, date: '2024-01-23T21:18:15Z' },
  { salesSummaryId: '0eb49bc9-7bb1-4593-b63c-623604b4d39e', totalValue: 7075340.95, changePercentage: 51.63, date: '2023-04-12T18:35:19Z' },
  { salesSummaryId: 'a03badbe-ed85-4f67-8563-e70957d711f5', totalValue: 6635158.49, changePercentage: 1.55, date: '2024-01-08T18:20:24Z' },
  { salesSummaryId: 'ef37f796-5792-48b5-947b-0861d1bcf1d2', totalValue: 5438733.13, changePercentage: 64.23, date: '2023-06-04T03:34:31Z' },
  { salesSummaryId: '38f4698c-f973-4118-a38f-0c772dc55993', totalValue: 8733498.2, changePercentage: -9.14, date: '2023-06-18T12:45:24Z' },
  { salesSummaryId: 'bb7b3f86-95f6-414a-95c5-d6ad13a50e3b', totalValue: 8834598.88, changePercentage: -74.91, date: '2023-09-18T22:57:29Z' },
  { salesSummaryId: '6f673a1d-78e9-4ea8-91e2-d7a32836cd3a', totalValue: 1518126.03, changePercentage: 22.59, date: '2024-02-17T06:29:57Z' },
  { salesSummaryId: 'ac08ecc4-f5e2-4f65-8f7d-3e9e02771657', totalValue: 8916033.73, changePercentage: -70.49, date: '2023-11-23T06:52:42Z' },
  { salesSummaryId: '3245bcab-7939-43ef-8f75-66bb2e092637', totalValue: 8457395.47, changePercentage: 58.85, date: '2023-06-14T06:58:44Z' },
  { salesSummaryId: '211ab48b-03e9-4e87-aff8-24723760c650', totalValue: 2131348.79, changePercentage: -46.72, date: '2023-04-07T03:15:00Z' },
  { salesSummaryId: '6bff1b90-9e27-493b-aead-d70b388c5058', totalValue: 4439655.91, changePercentage: -10.54, date: '2023-08-08T00:53:14Z' },
  { salesSummaryId: 'b2cd84fc-8f66-477a-ad53-eb7826b89eae', totalValue: 2253721.94, changePercentage: -26.4, date: '2023-12-04T03:33:12Z' },
  { salesSummaryId: 'db47a861-5062-49c5-92c1-0a8f13ec70b0', totalValue: 3844322.3, changePercentage: -23.92, date: '2023-07-18T05:39:04Z' },
  { salesSummaryId: '47ab518f-ec0e-4793-8d3b-53780452e472', totalValue: 3145456.83, changePercentage: -80.96, date: '2023-05-18T14:04:36Z' },
  { salesSummaryId: '2f255c3a-d024-4a49-9e3e-3ff4e529c362', totalValue: 5041224.3, changePercentage: 50.26, date: '2023-08-15T23:43:31Z' },
  { salesSummaryId: '1344c490-9f30-4a09-8379-e26dc551599e', totalValue: 8409410.21, changePercentage: 27.52, date: '2024-01-01T14:21:37Z' },
  { salesSummaryId: 'f9e8bb8b-b267-49d9-b621-7f912b348e81', totalValue: 4049054.53, changePercentage: -9.75, date: '2023-04-08T22:11:59Z' },
];

const RAW_EXPENSES = [
  { expenseId: '5c1121d7-20c8-4890-81c0-949bd60523a3', category: 'Salaries', amount: 1489153.5, timestamp: '2022-08-27T18:35:57Z' },
  { expenseId: '4529aaef-39d0-4188-9256-8c8fd5bad7ca', category: 'Office', amount: 1579039.97, timestamp: '2020-05-12T19:39:50Z' },
  { expenseId: 'fca4f2d0-c3d7-4246-a04e-626ab4045c40', category: 'Office', amount: 607415.3, timestamp: '2021-06-08T13:48:10Z' },
  { expenseId: '34de9517-153e-4505-9af8-dc8440e28dd9', category: 'Salaries', amount: 171044.25, timestamp: '2022-10-03T22:21:20Z' },
  { expenseId: 'c21c08e8-51b9-40f1-be37-b5116cd8d174', category: 'Salaries', amount: 303743.89, timestamp: '2020-03-18T00:41:00Z' },
  { expenseId: 'fb2dba2d-c186-4165-ab7d-66ce276041a4', category: 'Salaries', amount: 1707710.31, timestamp: '2020-05-04T20:18:41Z' },
  { expenseId: 'ba5ded78-639c-46ce-80bf-7d50642a1438', category: 'Office', amount: 1375535.38, timestamp: '2021-11-04T02:56:56Z' },
  { expenseId: 'c2f642b5-399b-48d7-9deb-e6a4eed0b9fa', category: 'Office', amount: 858502.63, timestamp: '2020-09-04T19:49:29Z' },
  { expenseId: 'fc8b38d8-388a-4898-9ca5-b942bbbec035', category: 'Professional', amount: 1557261.18, timestamp: '2020-07-22T02:35:40Z' },
  { expenseId: '36764f05-d204-4f71-bbd3-9d0263ea6863', category: 'Salaries', amount: 586616.74, timestamp: '2021-01-18T01:06:07Z' },
  { expenseId: '39e86828-36f4-4282-9599-bc4c42bae3a1', category: 'Office', amount: 1677605.54, timestamp: '2022-07-12T16:33:04Z' },
  { expenseId: '66a3d687-05b0-4796-9b09-14941aa73031', category: 'Salaries', amount: 1280249.59, timestamp: '2021-09-09T05:45:26Z' },
  { expenseId: 'cfbd98f2-c6ed-4bcc-b604-f3d330c5f31e', category: 'Professional', amount: 1851906.49, timestamp: '2021-12-24T09:18:27Z' },
  { expenseId: 'c68ccd7e-601c-4b09-b76f-c5a19308e526', category: 'Salaries', amount: 1791685.13, timestamp: '2022-08-05T03:18:23Z' },
  { expenseId: '3f19431c-3403-468b-9421-c9f54d466052', category: 'Salaries', amount: 589917.71, timestamp: '2021-05-19T17:43:00Z' },
];

const RAW_USERS = [
  { userId: '3b0fd66b-a4d6-4d95-94e4-01940c99aedb', name: 'Carly', email: 'cvansalzberger0@cisco.com' },
  { userId: 'd9d323fa-5c98-4222-a352-120e1f5e2798', name: 'Inesita', email: 'imcconnachie1@oaic.gov.au' },
  { userId: '9e2895ae-4afe-4ff2-b3b3-be15cf1c82d6', name: 'Tulley', email: 'tbridywater2@wikimedia.org' },
  { userId: 'c7072fb5-cd2b-4703-8a58-328e5b7ed95a', name: 'Amelia', email: 'atondeur3@posterous.com' },
  { userId: '22c29051-d301-4cc2-86dd-c19695408adb', name: 'Bucky', email: 'btompkin4@moonfruit.com' },
  { userId: '6ac28937-bc05-4c0a-be7e-1a332e2de312', name: 'Sherline', email: 'sinston5@issuu.com' },
  { userId: '552c1c73-e324-47ee-bf7f-b0dfbeb59788', name: 'Leontine', email: 'lchartres6@edublogs.org' },
  { userId: '962c8a6b-c914-4aa4-93bc-2b91188a1a58', name: 'Cloris', email: 'cmorrall7@un.org' },
  { userId: '35393a7a-f41b-4fe9-8901-fc39a8f803d6', name: 'Tobiah', email: 'trubinchik8@time.com' },
  { userId: '9cf146a9-3da9-47fe-bcc3-3abdeb3a375d', name: 'Colet', email: 'cmincini9@dell.com' },
  { userId: '4a6efba9-61a2-4829-abe6-dfed18484737', name: 'Van', email: 'vswaitea@imdb.com' },
  { userId: '6718765e-123c-42d4-b2b3-efc029ff854e', name: 'Mella', email: 'mheartyb@sphinn.com' },
  { userId: '0880eb85-2a08-4898-8aae-3cf90c48b08b', name: 'Karyl', email: 'kmatteic@live.com' },
  { userId: '2977c5fe-22be-454a-80e1-5b93db92a371', name: 'Berrie', email: 'bnortcliffed@linkedin.com' },
  { userId: 'bd909a0b-f665-451a-a052-8e8111e796e3', name: 'Giselle', email: 'gsollitte@weibo.com' },
  { userId: '26409ed7-15ac-4695-9813-be2afb6dad26', name: 'Niall', email: 'nrebeirof@netvibes.com' },
  { userId: '80697f6f-69bc-4b03-82c0-40f48884f716', name: 'Afton', email: 'ajozaitisg@craigslist.org' },
  { userId: '15d25fd9-32da-4ac7-b1b6-589a90a41dbf', name: 'Letisha', email: 'lgrimsdykeh@blogger.com' },
  { userId: '0bd8b2b2-d67f-47dc-9acc-d2311006852b', name: 'Julio', email: 'jcuniami@weibo.com' },
  { userId: 'e83bae68-8104-4847-9f08-98206f35d100', name: 'Dana', email: 'dstrugnellj@51.la' },
  { userId: 'a4cf8f1f-8c61-404d-834d-220202358f91', name: 'Gertie', email: 'gmacrok@networkadvertising.org' },
  { userId: 'e091dbc4-0fc5-4823-9fc4-1cdded1fc5f4', name: 'Vidovik', email: 'vriddettl@usgs.gov' },
  { userId: 'e9ceef74-fb81-41e0-b52e-0089b978b2f3', name: 'Yancey', email: 'yfentemm@51.la' },
  { userId: '9d82ca0e-cb41-4fba-a73f-acb7388e9d12', name: 'Lyndell', email: 'ldurninn@sciencedirect.com' },
  { userId: 'ecea4d11-d41e-468a-85d3-e80a193a5620', name: 'Heidie', email: 'hrackhamo@craigslist.org' },
  { userId: '29232f0d-2423-406f-956b-00ddf9540ac8', name: 'Clem', email: 'cthorbonp@smugmug.com' },
  { userId: 'afd4a67e-83ba-4a62-9cdc-2fdc0c553b29', name: 'Paten', email: 'pblasdaleq@quantcast.com' },
  { userId: '2a26982f-498f-4599-ab54-bc7469e2fbfd', name: 'Daisi', email: 'dsedgwickr@addthis.com' },
  { userId: 'c876a2cc-7528-4b61-837b-b7f7efc62cca', name: 'Sara-ann', email: 'sblundels@csmonitor.com' },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.expense.deleteMany({});
  await prisma.salesSummary.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.inventoryItem.deleteMany({});

  // Seed Inventory Items
  console.log('📦 Seeding inventory items...');
  const inventoryItems = RAW_PRODUCTS.map((p, index) => ({
    id: p.productId,
    name: p.name,
    sku: `PLT-${p.productId.substring(0, 4).toUpperCase()}`,
    category: getCategory(p.productId),
    quantity: p.stockQuantity,
    price: p.price,
    description: `High quality ${p.name} sourced from premium growers. Rating: ${p.rating}/5.0`,
    lastUpdated: new Date(),
    lowStockThreshold: Math.floor(Math.random() * 50000) + 10000,
    rating: p.rating,
    image: getImage(index),
  }));

  for (const item of inventoryItems) {
    await prisma.inventoryItem.create({ data: item });
  }
  console.log(`✅ Created ${inventoryItems.length} inventory items`);

  // Seed Users
  console.log('👥 Seeding users...');
  const users = RAW_USERS.map((user, i) => ({
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: i === 0 ? UserRole.ADMIN : Math.random() > 0.7 ? UserRole.ADMIN : Math.random() > 0.4 ? UserRole.STAFF : UserRole.VIEWER,
    status: Math.random() > 0.1 ? UserStatus.ACTIVE : UserStatus.INACTIVE,
  }));

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  console.log(`✅ Created ${users.length} users`);

  // Seed Sales Summary
  console.log('💰 Seeding sales summary...');
  for (const sale of RAW_SALES_SUMMARY) {
    await prisma.salesSummary.create({
      data: {
        salesSummaryId: sale.salesSummaryId,
        totalValue: sale.totalValue,
        changePercentage: sale.changePercentage,
        date: new Date(sale.date),
      },
    });
  }
  console.log(`✅ Created ${RAW_SALES_SUMMARY.length} sales records`);

  // Seed Expenses
  console.log('💸 Seeding expenses...');
  for (const expense of RAW_EXPENSES) {
    await prisma.expense.create({
      data: {
        expenseId: expense.expenseId,
        category: expense.category,
        amount: expense.amount,
        timestamp: new Date(expense.timestamp),
      },
    });
  }
  console.log(`✅ Created ${RAW_EXPENSES.length} expense records`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
