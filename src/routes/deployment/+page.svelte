<script></script>

<h2>Deployment and DNS</h2>
<section class="section">
  <h3 class="title">Security Certificate</h3>
  <p>
    This is where the fun really starts. Certificates are created in AWS. Go to <a
      href="https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1"
      target="_blank"
      >us-east-1.console.aws.amazon.com/console/home?region=us-east-1</a
    >, click "Services" in the upper left hand corner or search for and click
    certificate manager.
  </p>
  <ol>
    <li>Click "Request"</li>
    <li>Request a public certificate > Next</li>
    <li>Enter your domain name (e.g. example.com)</li>
    <li>
      Click "Add another name to this certificate" and add the wildcard (eg:
      *.example.com) (this is to cover any subdomains)
    </li>
    <li>Click "Request"</li>
  </ol>
  <p>
    This certificate then needs to be added to the DNS. We primarily use
    namecheap for our domain purhases and DNS management. The instructions below
    are for namecheap, but occassionally the DNS is managed in Route53 (AWS) or
    sadly even 💩GoDaddy💩.
  </p>
  <h3 class="title">Add Cert to Namecheap</h3>
  <p>
    In namecheap, go to the domain list and click "Manage" next to the domain
    you're working on. Click "Advanced DNS" in the left hand menu. Scroll down
    to the "Host Records" section and click "Add New Record". Select "CNAME
    Record" from the dropdown. Use the data from the certificate manager to
    complete the host and value fields. Click the checkmark to save.
  </p>
</section>
