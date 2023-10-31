# Generate Domain Key
Adobe employees can use this app to generate domain keys for themselves or customers.
A domain key is required to query for RUM data.

This app uses [Microsoft IDP authentication](https://www.aem.live/docs/authentication-setup-site) to verify
authorization in lieu of the requestor already holding a privileged domain key.
Currently this app must be hosted at https://generate--domainkey--langswei.hlx.live/ to function.
This restriction relates to the integration with franklin-domainkey-provider and may change in the future.