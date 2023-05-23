---
title: "Reset the Account Password"
keywords: "Forgot, Password, Super Kubenetes, Kubernetes"
description: "Reset the password of any account."
linkTitle: "Reset the Account Password"
Weight: 16410
---

## Reset the Password of a Regular User

1. Log in to the Super Kubenetes web console using the administrator who has the permission to manage users. 

2. Click **Platform** on the upper-left corner and select **Access Control**. Click **Users**.

3. On the **Users** page, click the user of which you need to change the password to visit its details page.

4. On the details page, click **More**, and then select **Change Password** from the drop-down list.

5. On the displayed dialog box, enter a new password and confirm the password. Click **OK** after finished.

## Reset the Administrator Password

Execute the following command on the host cluster to change the password of any account.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl patch users &lt;USERNAME&gt; -p <span style="color:#e6db74">'{"spec":{"password":"&lt;YOURPASSWORD&gt;"}}'</span> --type<span style="color:#f92672">=</span><span style="color:#e6db74">'merge'</span> <span style="color:#f92672">&amp;&amp;</span> kubectl annotate users &lt;USERNAME&gt; iam.Super Kubenetes.io/password-encrypted-
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    Make sure you replace `<USERNAME>` and `<YOURPASSWORD>` with the username and the new password in the command before you run it.
  </div>
</div>

