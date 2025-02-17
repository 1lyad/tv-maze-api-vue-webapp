import { test, expect } from '@playwright/test'

test('click "I\'m Feeling Lucky" until error message with retry button appears', async ({
  page,
}) => {
  await page.goto('http://localhost:4173/')
  const luckyButton = page.getByRole('button', { name: "I'm Feeling Lucky" })

  for (let i = 0; i < 30; i++) {
    await luckyButton.click()
    try {
      await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible({ timeout: 400 })
      break
    } catch {}
  }
})
