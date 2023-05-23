---
title: "Upload Apps to the Super Kubenetes GitHub Repository"
keywords: "Kubernetes, helm, Super Kubenetes, application"
description: "Upload your own apps to the GitHub repository of Super Kubenetes."
linkTitle: "Upload Apps to the Super Kubenetes GitHub Repository"
weight: 9320
---

Super Kubenetes provides an app repository for testing and development. Users can upload their apps to the repository, which will serve as available app templates once approved.

## Upload Your App

Build your app first based on [the Helm documentation](https://helm.sh/docs/topics/charts/). You can refer to the existing apps in the Super Kubenetes app repository. Official apps are stored in [src/main](https://github.com/Super Kubenetes/helm-charts/tree/master/src/main) and apps being tested are stored in [src/test](https://github.com/Super Kubenetes/helm-charts/tree/master/src/test).

### Step 1: Develop an app

1. [Fork the app repository of Super Kubenetes](https://github.com/Super Kubenetes/helm-charts/fork).

2. Install Helm based on [the Helm documentation](https://helm.sh/docs/intro/install/).

3. Execute the following command to initialize the Helm client.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						helm init --client-only
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Create your app. For example, you create an app named `mychart` in the directory `src/test`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cd src/test
                  helm create mychart
                  cd mychart
               </p>
            </code>
         </div>
      </pre>
   </article>

5. You can see that Helm has created related templates in the directory. For more information, see [Create an App](../../../application-store/app-developer-guide/helm-developer-guide/#create-an-app).

### Step 2: Submit an app

When you finish the development, submit a pull request to [the official repository of Super Kubenetes](https://github.com/Super Kubenetes/helm-charts) for review.

### Step 3: Deploy your app

After your pull request is approved, your app will be available to use. For more information, refer to [Import a Helm Repository](../import-helm-repository/) to add `https://charts.Super Kubenetes.io/main` to Super Kubenetes.

