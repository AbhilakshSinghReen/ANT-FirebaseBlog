import { db } from "../firebase";

//GENERAL
export async function getAllDocumentsOfCollection(collectionName) {
  const result = await db.collection(collectionName).get();

  const docs = [];

  result.docs.forEach((doc) => {
    docs.push({
      ...doc.data(),
      docId: doc.id,
    });
  });

  return docs;
}

export async function getAllDocumentsOfCollectionUpToLimit(
  collectionName,
  limit
) {
  const result = await db.collection(collectionName).limit(limit).get();

  const docs = [];

  result.docs.forEach((doc) => {
    docs.push({
      ...doc.data(),
      docId: doc.id,
    });
  });

  return docs;
}

export async function getConditionalDocumentsOfCollection(
  collectionName,
  keyValuePairs
) {
  let result = null;

  switch (keyValuePairs.length) {
    case 0:
      break;
    case 1:
      result = await db
        .collection(collectionName)
        .where(keyValuePairs[0].key, "==", keyValuePairs[0].value)
        .get();
      break;
    case 2:
      result = await db
        .collection(collectionName)
        .where(keyValuePairs[0].key, "==", keyValuePairs[0].value)
        .where(keyValuePairs[1].key, "==", keyValuePairs[1].value)
        .get();
      break;
    case 3:
      result = await db
        .collection(collectionName)
        .where(keyValuePairs[0].key, "==", keyValuePairs[0].value)
        .where(keyValuePairs[1].key, "==", keyValuePairs[1].value)
        .where(keyValuePairs[2].key, "==", keyValuePairs[2].value)
        .get();
      break;
    case 4:
      result = await db
        .collection(collectionName)
        .where(keyValuePairs[0].key, "==", keyValuePairs[0].value)
        .where(keyValuePairs[1].key, "==", keyValuePairs[1].value)
        .where(keyValuePairs[2].key, "==", keyValuePairs[2].value)
        .where(keyValuePairs[3].key, "==", keyValuePairs[3].value)
        .get();
      break;
    case 5:
      result = await db
        .collection(collectionName)
        .where(keyValuePairs[0].key, "==", keyValuePairs[0].value)
        .where(keyValuePairs[1].key, "==", keyValuePairs[1].value)
        .where(keyValuePairs[2].key, "==", keyValuePairs[2].value)
        .where(keyValuePairs[3].key, "==", keyValuePairs[3].value)
        .where(keyValuePairs[4].key, "==", keyValuePairs[4].value)
        .get();
      break;
    case 6:
      result = await db
        .collection(collectionName)
        .where(keyValuePairs[0].key, "==", keyValuePairs[0].value)
        .where(keyValuePairs[1].key, "==", keyValuePairs[1].value)
        .where(keyValuePairs[2].key, "==", keyValuePairs[2].value)
        .where(keyValuePairs[3].key, "==", keyValuePairs[3].value)
        .where(keyValuePairs[4].key, "==", keyValuePairs[4].value)
        .where(keyValuePairs[5].key, "==", keyValuePairs[5].value)
        .get();
      break;
    default:
      break;
  }

  if (result !== null) {
    const docs = [];

    result.docs.forEach((doc) => {
      docs.push({
        ...doc.data(),
        docId: doc.id,
      });
    });

    return docs;
  }

  return [];
}

export async function getDocumentByDocumentId(
  collectionName,
  targetDocumentId
) {
  const result = await db
    .collection(collectionName)
    .doc(targetDocumentId)
    .get();

  if (!result.exists) {
    return null;
  }

  const doc = {
    ...result.data(),
    docId: result.id,
  };

  return doc;
}

export async function getAllBlogCategoriesSummary() {
  const result = await getAllDocumentsOfCollection("blog-categories");

  const data = [];

  result.forEach((item, index) => {
    data.push({
      docId: item.docId,
      title: item.title,
      description: item.description,
      slug: item.slug,
      thumbnailImage: item.thumbnailImage,
    });
  });

  return data;
}

export async function getAllTutorialCategoriesSummary() {
  const result = await getAllDocumentsOfCollection("tutorial-categories");

  const data = [];

  result.forEach((item, index) => {
    data.push({
      docId: item.docId,
      title: item.title,
      description: item.description,
      slug: item.slug,
      thumbnailImage: item.thumbnailImage,
    });
  });

  return data;
}

//CONNECT
export async function getConnectPageContent() {
  const result = await db
    .collection("root")
    .doc("rootSocialNetworkProfiles")
    .get();

  const profiles = result.data().profiles;

  const data = [];

  profiles.forEach((item, index) => {
    data.push(JSON.parse(item));
  });

  return data;
}

//ABOUT
export async function getAboutPageContent() {
  const result = await db.collection("root").doc("about").get();

  const data = result.data();

  return {
    ...data,
    dateUpdated: data.dateUpdated.toDate().toString().slice(0, 15),
  };
}

//PRIVACY POLICY
export async function getPrivacyPolicyPageContent() {
  const result = await db.collection("root").doc("privacyPolicy").get();

  const data = result.data();

  return {
    ...data,
    dateUpdated: data.dateUpdated.toDate().toString().slice(0, 15),
  };
}

//TERMS AND CONDITIONS
export async function getTermsAndConditionsPageContent() {
  const result = await db.collection("root").doc("termsAndConditions").get();

  const data = result.data();

  return {
    ...data,
    dateUpdated: data.dateUpdated.toDate().toString().slice(0, 15),
  };
}

//HOMEPAGE
export async function getHomepageContent() {
  const result = await getAllDocumentsOfCollectionUpToLimit("blog-posts", 10);

  const data = [];

  result.forEach((item, index) => {
    data.push({
      title: item.title,
      summary: item.summary,
      thumbnailImage: item.thumbnailImage,
      linkTo: `/blog/${item.blogCategorySlug}/${item.blogSubcategorySlug}/${item.slug}`,
    });
  });

  return data;
}

//[blog categorySlug]
export async function getAllBlogCategoriesPaths() {
  const result = await getAllDocumentsOfCollection("blog-categories");

  const paths = result.map((item, index) => ({
    params: {
      docId: item.docId,
      categorySlug: item.slug,
    },
  }));

  return paths;
}

export async function getBlogCategoryBySlug(slug) {
  const keyValuePairs = [
    {
      key: "slug",
      value: slug,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "blog-categories",
    keyValuePairs
  );

  return result[0];
}

export async function getBlogSubcategoriesInCategorySummary(blogCategoryDocId) {
  const keyValuePairs = [
    {
      key: "blogCategoryDocId",
      value: blogCategoryDocId,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "blog-subcategories",
    keyValuePairs
  );

  const data = [];

  result.forEach((item, index) => {
    data.push({
      docId: item.docId,
      title: item.title,
      description: item.description,
      slug: item.slug,
      thumbnailImage: item.thumbnailImage,
    });
  });

  return data;
}

export async function getBlogCategoryWithSummaryBySlug(slug) {
  const result = await getBlogCategoryBySlug(slug);

  if (result === null) {
    return null;
  }

  const result2 = await getBlogSubcategoriesInCategorySummary(result.docId);

  const data = {
    ...result,
    subcategories: result2,
  };

  return data;
}

//[blog subcategorySlug]
export async function getAllBlogSubCategoriesPaths() {
  const result = await getAllDocumentsOfCollection("blog-subcategories");

  const paths = result.map((item, index) => ({
    params: {
      docId: item.docId,
      categorySlug: item.blogCategorySlug,
      subcategorySlug: item.slug,
    },
  }));

  return paths;
}

export async function getBlogSubcategoryBySlugs(categorySlug, subcategorySlug) {
  const keyValuePairs = [
    {
      key: "slug",
      value: subcategorySlug,
    },
    {
      key: "blogCategorySlug",
      value: categorySlug,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "blog-subcategories",
    keyValuePairs
  );

  return result[0];
}

export async function getBlogPostsInSubcategorySummary(blogSubcategoryDocId) {
  const keyValuePairs = [
    {
      key: "blogSubcategoryDocId",
      value: blogSubcategoryDocId,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "blog-posts",
    keyValuePairs
  );

  const data = [];

  result.forEach((item, index) => {
    data.push({
      docId: item.docId,
      title: item.title,
      summary: item.summary,
      slug: item.slug,
      thumbnailImage: item.thumbnailImage,
    });
  });

  return data;
}

export async function getBlogSubcategoryWithSummaryBySlugs(
  categorySlug,
  subcategorySlug
) {
  const result = await getBlogSubcategoryBySlugs(categorySlug, subcategorySlug);

  if (result === null) {
    return null;
  }

  const targetBlogCategory = await getBlogCategoryBySlug(
    result.blogCategorySlug
  );

  const result2 = await getBlogPostsInSubcategorySummary(result.docId);

  const data = {
    ...result,
    blogCategoryTitle: targetBlogCategory.title,
    posts: result2,
  };

  return data;
}

//[blog postSlug]
export async function getAllBlogPostsPaths() {
  const result = await getAllDocumentsOfCollection("blog-posts");

  const paths = result.map((item, index) => ({
    params: {
      docId: item.docId,
      categorySlug: item.blogCategorySlug,
      subcategorySlug: item.blogSubcategorySlug,
      postSlug: item.slug,
    },
  }));

  return paths;
}

export async function getBlogPostBySlugs(
  categorySlug,
  subcategorySlug,
  postSlug
) {
  const keyValuePairs = [
    {
      key: "slug",
      value: postSlug,
    },
    {
      key: "blogCategorySlug",
      value: categorySlug,
    },
    {
      key: "blogSubcategorySlug",
      value: subcategorySlug,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "blog-posts",
    keyValuePairs
  );

  const targetBlogCategory = await getBlogCategoryBySlug(
    result[0].blogCategorySlug
  );

  const targetBlogSubcategory = await getBlogSubcategoryBySlugs(
    result[0].blogCategorySlug,
    result[0].blogSubcategorySlug
  );

  const data = {
    ...result[0],
    blogCategoryTitle: targetBlogCategory.title,
    blogSubcategoryTitle: targetBlogSubcategory.title,
    dateUpdated: result[0].dateUpdated.toDate().toString().slice(0, 15),
    index: JSON.parse(result[0].index),
  };

  return data;
}

//[tutorialCategorySlug]
export async function getAllTutorialCategoriesPaths() {
  const result = await getAllDocumentsOfCollection("tutorial-categories");

  const paths = result.map((item, index) => ({
    params: {
      docId: item.docId,
      tutorialCategorySlug: item.slug,
    },
  }));

  return paths;
}

export async function getTutorialCategoryBySlug(slug) {
  const keyValuePairs = [
    {
      key: "slug",
      value: slug,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "tutorial-categories",
    keyValuePairs
  );

  return result[0];
}

export async function getTutorialSubcategoriesInCategorySummary(
  tutorialCategoryDocId
) {
  const keyValuePairs = [
    {
      key: "tutorialCategoryDocId",
      value: tutorialCategoryDocId,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "tutorial-subcategories",
    keyValuePairs
  );

  const data = [];

  result.forEach((item, index) => {
    data.push({
      docId: item.docId,
      title: item.title,
      description: item.description,
      slug: item.slug,
      thumbnailImage: item.thumbnailImage,
    });
  });

  return data;
}

export async function getTutorialCategoryWithSummaryBySlug(slug) {
  const result = await getTutorialCategoryBySlug(slug);

  if (result === null) {
    return null;
  }

  const result2 = await getTutorialSubcategoriesInCategorySummary(result.docId);

  const data = {
    ...result,
    subcategories: result2,
  };

  return data;
}

//[tutorialSubcategorySlug]
export async function getAllTutorialSubcategoriesPaths() {
  const result = await getAllDocumentsOfCollection("tutorial-subcategories");

  const paths = result.map((item, index) => ({
    params: {
      docId: item.docId,
      tutorialCategorySlug: item.tutorialCategorySlug,
      tutorialSubcategorySlug: item.slug,
    },
  }));

  return paths;
}

export async function getTutorialSubcategoryBySlugs(
  tutorialCategorySlug,
  tutorialSubcategorySlug
) {
  const keyValuePairs = [
    {
      key: "slug",
      value: tutorialSubcategorySlug,
    },
    {
      key: "tutorialCategorySlug",
      value: tutorialCategorySlug,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "tutorial-subcategories",
    keyValuePairs
  );

  return result[0];
}

export async function getTutorialSeriesInSubcategorySummary(
  tutorialSubcategoryDocId
) {
  const keyValuePairs = [
    {
      key: "tutorialSubcategoryDocId",
      value: tutorialSubcategoryDocId,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "tutorial-series",
    keyValuePairs
  );

  const data = [];

  result.forEach((item, index) => {
    data.push({
      docId: item.docId,
      title: item.title,
      summary: item.summary,
      slug: item.slug,
      thumbnailImage: item.thumbnailImage,
    });
  });

  return data;
}

export async function getTutorialSubcategoryWithSummaryBySlugs(
  tutorialCategorySlug,
  tutorialSubcategorySlug
) {
  const result = await getTutorialSubcategoryBySlugs(
    tutorialCategorySlug,
    tutorialSubcategorySlug
  );

  if (result === null) {
    return null;
  }

  const targetTutorialCategory = await getTutorialCategoryBySlug(
    result.tutorialCategorySlug
  );

  const result2 = await getTutorialSeriesInSubcategorySummary(result.docId);

  const data = {
    ...result,
    tutorialCategoryTitle: targetTutorialCategory.title,
    series: result2,
  };

  return data;
}

//[tutorialSeriesSlug]
export async function getAllTutorialSeriesPaths() {
  const result = await getAllDocumentsOfCollection("tutorial-series");

  const paths = result.map((item, index) => ({
    params: {
      docId: item.docId,
      tutorialCategorySlug: item.tutorialCategorySlug,
      tutorialSubcategorySlug: item.tutorialSubcategorySlug,
      tutorialSeriesSlug: item.slug,
    },
  }));

  return paths;
}

export async function getTutorialSeriesBySlugs(
  tutorialCategorySlug,
  tutorialSubcategorySlug,
  tutorialSeriesSlug
) {
  const keyValuePairs = [
    {
      key: "slug",
      value: tutorialSeriesSlug,
    },
    {
      key: "tutorialSubcategorySlug",
      value: tutorialSubcategorySlug,
    },
    {
      key: "tutorialCategorySlug",
      value: tutorialCategorySlug,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "tutorial-series",
    keyValuePairs
  );

  return result[0];
}

export async function getTutorialsInSeriesSummary(tutorialSeriesDocId) {
  const keyValuePairs = [
    {
      key: "tutorialSeriesDocId",
      value: tutorialSeriesDocId,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "tutorials",
    keyValuePairs
  );

  const data = [];

  result.forEach((item, index) => {
    data.push({
      docId: item.docId,
      title: `Part ${item.partInSeries}${item.subPartInSeries}: ${item.title}`,
      summary: item.summary,
      slug: item.slug,
      thumbnailImage: item.thumbnailImage,
      partInSeries: item.partInSeries,
      subPartInSeries: item.subPartInSeries,
    });
  });

  data.sort((x, y) => {
    return (
      x.partInSeries - y.partInSeries || x.subPartInSeries - y.subPartInSeries
    );
  });

  return data;
}

export async function getTutorialSeriesWithSummaryBySlugs(
  tutorialCategorySlug,
  tutorialSubcategorySlug,
  tutorialSeriesSlug
) {
  const result = await getTutorialSeriesBySlugs(
    tutorialCategorySlug,
    tutorialSubcategorySlug,
    tutorialSeriesSlug
  );

  if (result === null) {
    return null;
  }

  const targetTutorialCategory = await getTutorialCategoryBySlug(
    result.tutorialCategorySlug
  );

  const targetTutorialSubcategory = await getTutorialSubcategoryBySlugs(
    result.tutorialCategorySlug,
    result.tutorialSubcategorySlug
  );

  const result2 = await getTutorialsInSeriesSummary(result.docId);

  const data = {
    ...result,
    tutorialCategoryTitle: targetTutorialCategory.title,
    tutorialSubcategoryTitle: targetTutorialSubcategory.title,
    tutorials: result2,
  };

  return data;
}

//[tutorialSlug]
export async function getAllTutorialsPaths() {
  const result = await getAllDocumentsOfCollection("tutorials");

  const paths = result.map((item, index) => ({
    params: {
      docId: item.docId,
      tutorialCategorySlug: item.tutorialCategorySlug,
      tutorialSubcategorySlug: item.tutorialSubcategorySlug,
      tutorialSeriesSlug: item.tutorialSeriesSlug,
      tutorialSlug: item.slug,
    },
  }));

  return paths;
}

export async function getTutorialBySlugs(
  tutorialCategorySlug,
  tutorialSubcategorySlug,
  tutorialSeriesSlug,
  tutorialSlug
) {
  const keyValuePairs = [
    {
      key: "slug",
      value: tutorialSlug,
    },
    {
      key: "tutorialSeriesSlug",
      value: tutorialSeriesSlug,
    },
    {
      key: "tutorialSubcategorySlug",
      value: tutorialSubcategorySlug,
    },
    {
      key: "tutorialCategorySlug",
      value: tutorialCategorySlug,
    },
  ];

  const result = await getConditionalDocumentsOfCollection(
    "tutorials",
    keyValuePairs
  );

  const targetTutorialCategory = await getTutorialCategoryBySlug(
    result[0].tutorialCategorySlug
  );

  const targetTutorialSubcategory = await getTutorialSubcategoryBySlugs(
    result[0].tutorialCategorySlug,
    result[0].tutorialSubcategorySlug
  );

  const targetTutorialSeries = await getTutorialSeriesWithSummaryBySlugs(
    result[0].tutorialCategorySlug,
    result[0].tutorialSubcategorySlug,
    result[0].tutorialSeriesSlug
  );

  const data = {
    ...result[0],
    tutorialCategoryTitle: targetTutorialCategory.title,
    tutorialSubcategoryTitle: targetTutorialSubcategory.title,
    tutorialSeriesTitle: targetTutorialSeries.title,
    dateUpdated: result[0].dateUpdated.toDate().toString().slice(0, 15),
    index: JSON.parse(result[0].index),
    seriesDetails:targetTutorialSeries,
  };

  return data;
}
